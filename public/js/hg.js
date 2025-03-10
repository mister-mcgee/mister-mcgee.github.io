// Mercury 0.1.7
const hg = {

  get VERSION(){
    delete this.VERSION

    return this.VERSION = hg.Version({
      moniker: "Mercury",
      major: 0,
      minor: 1,
      patch: 7
    })
  },

  get Version() {
    delete this.Version

    function Version(o) {
      const MONIKER = o?.moniker ?? "Mercury"
      const MAJOR   = o?.major   ?? 0
      const MINOR   = o?.minor   ?? 0
      const PATCH   = o?.patch   ?? 0

      return {
        get moniker() { return MONIKER },
        get major()   { return MAJOR   },
        get minor()   { return MINOR   },
        get patch()   { return PATCH   }
      }
    }

    Version.toString = function(a) {
      return `${a.moniker} ${a.major}.${a.minor}.${a.patch}`
    }

    return this.Version = Version
  },

  get EventNode() {
    delete this.EventNode    
    
    function EventNode() {
      return {
        children : new Map(),
        listeners: new Map()
      }
    }    
    
    EventNode.requireListeners = function(root, type) {
      let listeners = root.listeners.get(type)
      if(!listeners) root.listeners.set(
        type, listeners = new Set()
      )
      return listeners
    }    
    
    EventNode.requestListeners = function(root, type) {
      let listeners = root?.listeners.get(type)
      if(!listeners) return
      return listeners
    }    
    
    EventNode.releaseListeners = function(root, type) {
      if(type !== undefined)
        EventNode.requestListeners(root, type)?.clear()
      else {
        root?.children .clear()
        root?.listeners.clear()
      }
    }

    EventNode.releaseListener  = function(root, type, listener) {
      if(type !== undefined) 
        EventNode.requestListeners(root, type)?.delete(listener)
      else                   
        root         ?.listeners.forEach(l => l.delete(listener))
    }    
    
    EventNode.requireNode = function(root, path) {
      for(const part of path.split("/")) {
        let node = root.children.get(part)
        if(!node) root.children.set(
          part, node = EventNode()
        )
        root = node
      }
      return root
    }    
    
    EventNode.requestNode = function(root, path) {
      for(const part of path.split("/")) {
        let node = root.children.get(part)
        if(!node) return
        root = node
      }
      return root
    }

    return this.EventNode = EventNode
  },
  get EventTree() {
    delete this.EventTree    
    
    function EventTree() {
      return {
        root   : hg.EventNode(),
        pending: new Array()
      }
    }

    const LISTEN   = "__LISTEN__"   
    const DEAFEN   = "__DEAFEN__"   
    const DISPATCH = "__DISPATCH__"

    EventTree.listen = function(tree, type, listener, o) {
      const a = { action: LISTEN, path: o?.path ?? "", type, listener }
      if(o?.defer ?? true) queue(tree, a)
      else                 flush(tree, a)
    }

    EventTree.deafen = function(tree, type, listener, o) {
      const a = { action: DEAFEN, path: o?.path ?? "", type, listener }
      if(o?.defer ?? true) queue(tree, a)
      else                 flush(tree, a)
    }

    EventTree.dispatch = function(tree, type, event, o) {
      const a = { action: DISPATCH, path: o?.path ?? "", type, event }
      if(o?.defer ?? true) queue(tree, a)
      else                 flush(tree, a)
    }

    EventTree.poll = function(tree) {
      tree.pending.splice(0, tree.pending.length).forEach(
        a => flush(tree, a)
      )
    }

    function queue(tree, a) {
      tree.pending.push(a)
    }    
    
    function flush(tree, a) {
      switch(a.action) {
        case LISTEN  : onListen  (tree, a); break
        case DEAFEN  : onDeafen  (tree, a); break
        case DISPATCH: onDispatch(tree, a); break
      }
    }    
    
    function onListen(tree, a) {
      hg.EventNode.requireListeners(hg.EventNode.requireNode(tree.root, a.path), a.type).add(a.listener)
    }    
    
    function onDeafen(tree, a) {
      if(a.listener === undefined)
        hg.EventNode.releaseListeners(hg.EventNode.requestNode(tree.root, a.path), a.type            )
      else
        hg.EventNode.releaseListener (hg.EventNode.requestNode(tree.root, a.path), a.type, a.listener)
    }    
    
    function onDispatch(tree, a) { 
      onDispatchRecursive(hg.EventNode.requestNode(tree.root, a.path), tree, a.path, a.type, a.event)
    }

    function onDispatchRecursive(node, tree, path, type, event) {
      if(node === undefined) return

      hg.EventNode.requestListeners(node, type)?.forEach(self => {
        self(event, {tree, path, type, self})
      })
      node.children.forEach((child, name) => {
        onDispatchRecursive(child, tree, path + "/" + name, type, event)
      })
    }

    return this.EventTree = EventTree
  },

  get Canvas() {
    delete this.Canvas

    function Canvas() {
      const canvas = document.createElement("canvas")
        canvas.style.position = "absolute"
        canvas.style.top      = "0"
        canvas.style.left     = "0"
        canvas.style.width    = "100vw"
        canvas.style.height   = "100vh"
      document.body.appendChild(canvas)
      return canvas
    }

    return this.Canvas = Canvas
  },
  
  get Stage() {
    delete this.Stage

    function Stage(o) {
      // configure
      const configureDebug             = o?.debug ?? false
      const configureW                 = o?.w ?? 0
      const configureH                 = o?.h ?? 0
      const configureLogicalBackground = o?.lbg ?? "black"
      const configureVirtualBackground = o?.vbg ?? "white"
      const configureScaleIncrement = o?.scaleIncrement
      const configureImageSmoothing = o?.imageSmoothing

      // setup
      const logicalCanvasElement = o?.canvas ?? hg.Canvas()
      const virtualCanvasElement = new OffscreenCanvas(
        configureW || logicalCanvasElement.width ,
        configureH || logicalCanvasElement.height
      )

      const logicalCanvasContext = logicalCanvasElement.getContext("2d")
      const virtualCanvasContext = virtualCanvasElement.getContext("2d")

      let virtualScale = Math.min(
        logicalCanvasElement.width  / virtualCanvasElement.width ,
        logicalCanvasElement.height / virtualCanvasElement.height
      )
      // configure scale increment
      if(!!configureScaleIncrement) {
        virtualScale = Math.floor(virtualScale / configureScaleIncrement) * configureScaleIncrement
      }
      // configure image smoothing
      logicalCanvasContext.imageSmoothingEnabled = !!configureImageSmoothing
      virtualCanvasContext.imageSmoothingEnabled = !!configureImageSmoothing
      if(!!configureImageSmoothing) {
        logicalCanvasContext.imageSmoothingQuality = configureImageSmoothing
        virtualCanvasContext.imageSmoothingQuality = configureImageSmoothing
      }

      const stage = {
        configureDebug,
        configureW,
        configureH,
        configureLogicalBackground,
        configureVirtualBackground,
        configureScaleIncrement,
        configureImageSmoothing,

        logicalCanvasElement,
        logicalCanvasContext,
        virtualCanvasElement,
        virtualCanvasContext,
        virtualScale,

        eventTree: hg.EventTree(),        
        input    : undefined,
        scene    : undefined,

        framesPerSecond: 0,

        averageFrameMilliseconds : 0,
        averageUpdateMilliseconds: 0,
        averageRenderMilliseconds: 0,

        minimumFrameMilliseconds : 0,
        minimumUpdateMilliseconds: 0,
        minimumRenderMilliseconds: 0,

        maximumFrameMilliseconds : 0,
        maximumUpdateMilliseconds: 0,
        maximumRenderMilliseconds: 0,

        framesPerSecondAccumulator: 0,

        averageFrameMillisecondsAccumulator : 0,
        averageUpdateMillisecondsAccumulator: 0,
        averageRenderMillisecondsAccumulator: 0,

        minimumFrameMillisecondsAccumulator : Number.MAX_SAFE_INTEGER,
        minimumUpdateMillisecondsAccumulator: Number.MAX_SAFE_INTEGER,
        minimumRenderMillisecondsAccumulator: Number.MAX_SAFE_INTEGER,

        maximumFrameMillisecondsAccumulator : 0,
        maximumUpdateMillisecondsAccumulator: 0,
        maximumRenderMillisecondsAccumulator: 0,

        oneSecondAccumulator: 0,
      }

      stage.input = hg.Input(stage)

      new ResizeObserver(() => Stage.dispatch(stage, hg.ON_RESIZE, undefined)).observe(logicalCanvasElement)
      Stage.listen(stage, hg.ON_RESIZE    , (   ) => onResize(stage       ))
      Stage.listen(stage, hg.ON_CHANGE    , scene => onChange(stage, scene))

      Stage.listen(stage, hg.ON_KEY_UP    , event => onKeyUp    (stage, event))
      Stage.listen(stage, hg.ON_KEY_DOWN  , event => onKeyDown  (stage, event))
      Stage.listen(stage, hg.ON_MOUSE_UP  , event => onMouseUp  (stage, event))
      Stage.listen(stage, hg.ON_MOUSE_DOWN, event => onMouseDown(stage, event))
      Stage.listen(stage, hg.ON_MOUSE_MOVE, event => onMouseMove(stage, event))
      Stage.listen(stage, hg.ON_WHEEL     , event => onWheel    (stage, event))

      requestAnimationFrame(
        t0 => requestAnimationFrame(
          t1 => requestAnimationFrame(
            t2 => animate(stage, t0, t1, t2))))

      return stage
    }

    function onUpdate(stage, t, dt) {
         Stage.poll(stage      )
      if(stage.scene && (stage.scene.updateable ?? true) && stage.scene.onUpdate)
        stage.scene.onUpdate({stage, t, dt, input: stage.input})
      hg.Input.poll(stage.input)
    }

    function onRender(stage, t, dt) {
      stage.logicalCanvasContext.resetTransform()

      stage.logicalCanvasContext.fillStyle = stage.configureLogicalBackground
      stage.logicalCanvasContext.fillRect(
        0, 0,
        stage.logicalCanvasElement.width,
        stage.logicalCanvasElement.height
      )
    
      stage.virtualCanvasContext.fillStyle = stage.configureVirtualBackground
      stage.virtualCanvasContext.fillRect(
        0, 0,
        stage.virtualCanvasElement.width,
        stage.virtualCanvasElement.height
      )
    
      stage.logicalCanvasContext.translate(
        (stage.logicalCanvasElement.width  - stage.virtualCanvasElement.width  * stage.virtualScale) / 2,
        (stage.logicalCanvasElement.height - stage.virtualCanvasElement.height * stage.virtualScale) / 2,
      )
      stage.logicalCanvasContext.scale(
        stage.virtualScale,
        stage.virtualScale
      )
    
      if(stage.scene && (stage.scene.renderable ?? true) && stage.scene.onRender)
        stage.scene.onRender({stage, t, dt, input: stage.input, g: stage.virtualCanvasContext})
    
      stage.logicalCanvasContext.drawImage(stage.virtualCanvasElement, 0, 0)

      if(stage.configureDebug && stage.configureDebug !== "print") {
        stage.logicalCanvasContext.resetTransform()

        stage.logicalCanvasContext.fillStyle = "#000"
        stage.logicalCanvasContext.globalAlpha = 0.75
        stage.logicalCanvasContext.fillRect(
          0, 0, stage.logicalCanvasElement.width, 88
        )

        stage.logicalCanvasContext.fillStyle = "#fff"
        stage.logicalCanvasContext.font = "16px monospace"
        stage.logicalCanvasContext.globalAlpha = 1

        stage.logicalCanvasContext.fillText(versionInfo(), 8, 20)
        stage.logicalCanvasContext.fillText(frameInfo (stage), 8, 36)
        stage.logicalCanvasContext.fillText(updateInfo(stage), 8, 52)
        stage.logicalCanvasContext.fillText(renderInfo(stage), 8, 68)
        stage.logicalCanvasContext.fillText(canvasInfo(stage), 8, 84)
      }
    }

    function versionInfo() {
      return `*** ${hg.Version.toString(hg.VERSION)} ***`
    }

    function frameInfo(stage) {
      return `Frame ${stage.framesPerSecond.toFixed(0).padStart(3)} hz ~ ${stage.averageFrameMilliseconds.toFixed(2).padStart(5)} ms [${stage.minimumFrameMilliseconds.toFixed(2).padStart(5)}, ${stage.maximumFrameMilliseconds.toFixed(2).padStart(5)}]`
    }

    function updateInfo(stage) {
      return `Update         ${stage.averageUpdateMilliseconds.toFixed(2).padStart(5)} ms [${stage.minimumUpdateMilliseconds.toFixed(2).padStart(5)}, ${stage.maximumUpdateMilliseconds.toFixed(2).padStart(5)}] (${(stage.averageUpdateMilliseconds / stage.averageFrameMilliseconds * 100).toFixed(0).padStart(3)}%)`
    }

    function renderInfo(stage) {
      return `Render         ${stage.averageRenderMilliseconds.toFixed(2).padStart(5)} ms [${stage.minimumRenderMilliseconds.toFixed(2).padStart(5)}, ${stage.maximumRenderMilliseconds.toFixed(2).padStart(5)}] (${(stage.averageRenderMilliseconds / stage.averageFrameMilliseconds * 100).toFixed(0).padStart(3)}%)`
    }

    function canvasInfo(stage) {
      const
        [logicalW, logicalH] = Stage.getLogicalSize (stage),
        [virtualW, virtualH] = Stage.getVirtualSize (stage),
        virtualScale         = Stage.getVirtualScale(stage);

      return `Canvas ${logicalW}x${logicalH} ${virtualW}x${virtualH} ${(virtualScale*100).toFixed(0)}%`
    }

    function animate(stage, t0, t1, t2) {
      const
        t  = (t2 - t0) / 1000,
        dt = (t2 - t1) / 1000;
      const a = performance.now()
      onUpdate(stage, t, dt)
      const b = performance.now()
      onRender(stage, t, dt)
      const c = performance.now()

      if(stage.configureDebug) {
        const
          frameMilliseconds  = c - a,
          updateMilliseconds = b - a,
          renderMilliseconds = c - b;

        stage.framesPerSecondAccumulator += 1

        stage.averageFrameMillisecondsAccumulator  += frameMilliseconds
        stage.averageUpdateMillisecondsAccumulator += updateMilliseconds
        stage.averageRenderMillisecondsAccumulator += renderMilliseconds

        stage.minimumFrameMillisecondsAccumulator  = Math.min(stage.minimumFrameMillisecondsAccumulator, frameMilliseconds)
        stage.minimumUpdateMillisecondsAccumulator = Math.min(stage.minimumUpdateMillisecondsAccumulator, updateMilliseconds)
        stage.minimumRenderMillisecondsAccumulator = Math.min(stage.minimumRenderMillisecondsAccumulator, renderMilliseconds)

        stage.maximumFrameMillisecondsAccumulator  = Math.max(stage.maximumFrameMillisecondsAccumulator, frameMilliseconds)
        stage.maximumUpdateMillisecondsAccumulator = Math.max(stage.maximumUpdateMillisecondsAccumulator, updateMilliseconds)
        stage.maximumRenderMillisecondsAccumulator = Math.max(stage.maximumRenderMillisecondsAccumulator, renderMilliseconds)

        stage.oneSecondAccumulator += dt

        if(stage.oneSecondAccumulator >= 1) {
          stage.framesPerSecond = stage.framesPerSecondAccumulator

          stage.averageFrameMilliseconds  = stage.averageFrameMillisecondsAccumulator  / stage.framesPerSecondAccumulator
          stage.averageUpdateMilliseconds = stage.averageUpdateMillisecondsAccumulator / stage.framesPerSecondAccumulator
          stage.averageRenderMilliseconds = stage.averageRenderMillisecondsAccumulator / stage.framesPerSecondAccumulator

          stage.minimumFrameMilliseconds  = stage.minimumFrameMillisecondsAccumulator
          stage.minimumUpdateMilliseconds = stage.minimumUpdateMillisecondsAccumulator
          stage.minimumRenderMilliseconds = stage.minimumRenderMillisecondsAccumulator

          stage.maximumFrameMilliseconds  = stage.maximumFrameMillisecondsAccumulator
          stage.maximumUpdateMilliseconds = stage.maximumUpdateMillisecondsAccumulator
          stage.maximumRenderMilliseconds = stage.maximumRenderMillisecondsAccumulator

          stage.framesPerSecondAccumulator = 0

          stage.averageFrameMillisecondsAccumulator  = 0
          stage.averageUpdateMillisecondsAccumulator = 0
          stage.averageRenderMillisecondsAccumulator = 0

          stage.minimumFrameMillisecondsAccumulator  = Number.MAX_SAFE_INTEGER
          stage.minimumUpdateMillisecondsAccumulator = Number.MAX_SAFE_INTEGER
          stage.minimumRenderMillisecondsAccumulator = Number.MAX_SAFE_INTEGER

          stage.maximumFrameMillisecondsAccumulator  = 0
          stage.maximumUpdateMillisecondsAccumulator = 0
          stage.maximumRenderMillisecondsAccumulator = 0

          stage.oneSecondAccumulator = 0

          if(stage.configureDebug !== "paint") {
            console.log("*** DEBUG ***")
            console.log(frameInfo (stage))
            console.log(updateInfo(stage))
            console.log(renderInfo(stage))
            console.log(canvasInfo(stage))
          }
        }
      }

      requestAnimationFrame(t3 => animate(stage, t0, t2, t3))
    }    
    
    function onChange(stage, scene) {
      if(stage.scene && stage.scene.onDetach)
        stage.scene.onDetach(stage)
      stage.scene = scene
      if(stage.scene && stage.scene.onAttach)
        stage.scene.onAttach(stage)
    }

    function onResize(stage) {
      stage.logicalCanvasElement.width  = stage.logicalCanvasElement.getBoundingClientRect().width
      stage.logicalCanvasElement.height = stage.logicalCanvasElement.getBoundingClientRect().height

      const w = stage.configureW || stage.logicalCanvasElement.width
      const h = stage.configureH || stage.logicalCanvasElement.height

      if(
        w !== stage.virtualCanvasElement.width || 
        h !== stage.virtualCanvasElement.height
      ) {
        stage.virtualCanvasElement = new OffscreenCanvas(
          stage.configureW || stage.logicalCanvasElement.width,
          stage.configureH || stage.logicalCanvasElement.height
        )
        stage.virtualCanvasContext = stage.virtualCanvasElement.getContext("2d")
      }

      stage.virtualScale = Math.min(
        stage.logicalCanvasElement.width  / stage.virtualCanvasElement.width,
        stage.logicalCanvasElement.height / stage.virtualCanvasElement.height
      )

      // configure scale increment
      if(!!stage.configureScaleIncrement)
        stage.virtualScale = Math.floor(stage.virtualScale / stage.configureScaleIncrement) * stage.configureScaleIncrement
      
      // configure image smoothing
      stage.logicalCanvasContext.imageSmoothingEnabled = !!stage.configureImageSmoothing
      stage.virtualCanvasContext.imageSmoothingEnabled = !!stage.configureImageSmoothing
      if(!!stage.configureImageSmoothing) {
        stage.logicalCanvasContext.imageSmoothingQuality = stage.configureImageSmoothing
        stage.virtualCanvasContext.imageSmoothingQuality = stage.configureImageSmoothing
      }
    }

    function onKeyUp    (stage, event) {
      if(stage.scene && stage.scene.onKeyUp)
        stage.scene.onKeyUp(stage.input, event)
    }

    function onKeyDown  (stage, event) {
      if(stage.scene && stage.scene.onKeyDown)
        stage.scene.onKeyDown(stage.input, event)
    }

    function onMouseUp  (stage, event) {
      if(stage.scene && stage.scene.onMouseUp)
        stage.scene.onMouseUp(stage.input, event)
    }

    function onMouseDown(stage, event) {
      if(stage.scene && stage.scene.onMouseDown)
        stage.scene.onMouseDown(stage.input, event)
    }

    function onMouseMove(stage, event) {
      if(stage.scene && stage.scene.onMouseMove)
        stage.scene.onMouseMove(stage.input, event)
    }

    function onWheel    (stage, event) {
      if(stage.scene && stage.scene.onWheel)
        stage.scene.onWheel(stage.input, event)
    }    
    
    Stage.listen   = function(stage, type, listener, o) {
      hg.EventTree.listen(stage.eventTree, type, listener, o)
    }    
    
    Stage.deafen   = function(stage, type, listener, o) {
      hg.EventTree.deafen(stage.eventTree, type, listener, o)
    }

    Stage.dispatch = function(stage, type, event, o) {
      hg.EventTree.dispatch(stage.eventTree, type, event, o)
    }    
    
    Stage.scene = function(stage, scene) {
      Stage.dispatch(stage, hg.ON_CHANGE, scene)
    }

    Stage.poll = function(stage) {
      hg.EventTree.poll(stage.eventTree)
    }    
    
    Stage.getLogicalSize = function(stage) {
      return [
        stage.logicalCanvasElement.width,
        stage.logicalCanvasElement.height
      ]
    }    
    
    Stage.getVirtualSize = function(stage) {
      return [
        stage.virtualCanvasElement.width,
        stage.virtualCanvasElement.height
      ]
    }    
    
    Stage.getVirtualScale = function(stage) {
      return stage.virtualScale
    }

    Stage.logicalToVirtual = function(stage, [x, y]) {
      const
        [logicalW, logicalH] = Stage.getLogicalSize (stage),
        [virtualW, virtualH] = Stage.getVirtualSize (stage),
        scale                = Stage.getVirtualScale(stage);
      return [
        (x - logicalW / 2) / scale + virtualW / 2,
        (y - logicalH / 2) / scale + virtualH / 2
      ]
    }
    
    Stage.virtualToLogical = function(stage, [x, y]) {
      const
        [logicalW, logicalH] = Stage.getLogicalSize (stage),
        [virtualW, virtualH] = Stage.getVirtualSize (stage),
        scale                = Stage.getVirtualScale(stage);
      return [
        (x - virtualW / 2) * scale + logicalW / 2,
        (y - virtualH / 2) * scale + logicalH / 2
      ]
    }

    return this.Stage = Stage
  },  
  
  get Input() {
    delete this.Input
    
    function Input(stage) {
      const input = {
        stage,        
        keys   : new Map(),
        buttons: new Map(),
        mouse  : [0, 0],
        wheel  : [0, 0],
      }

      if(stage.logicalCanvasElement.tabIndex <= 0)
        stage.logicalCanvasElement.tabIndex = 1

      stage.logicalCanvasElement.addEventListener("keyup"    , event => hg.Stage.dispatch(stage, hg.ON_NATIVE_KEY_UP    , event))
      stage.logicalCanvasElement.addEventListener("keydown"  , event => hg.Stage.dispatch(stage, hg.ON_NATIVE_KEY_DOWN  , event))
      stage.logicalCanvasElement.addEventListener("mouseup"  , event => hg.Stage.dispatch(stage, hg.ON_NATIVE_MOUSE_UP  , event))
      stage.logicalCanvasElement.addEventListener("mousedown", event => hg.Stage.dispatch(stage, hg.ON_NATIVE_MOUSE_DOWN, event))
      stage.logicalCanvasElement.addEventListener("mousemove", event => hg.Stage.dispatch(stage, hg.ON_NATIVE_MOUSE_MOVE, event))
      stage.logicalCanvasElement.addEventListener("wheel"    , event => hg.Stage.dispatch(stage, hg.ON_NATIVE_WHEEL     , event))

      hg.Stage.listen(stage, hg.ON_NATIVE_KEY_UP    , event => onNativeKeyUp    (input, event))
      hg.Stage.listen(stage, hg.ON_NATIVE_KEY_DOWN  , event => onNativeKeyDown  (input, event))
      hg.Stage.listen(stage, hg.ON_NATIVE_MOUSE_UP  , event => onNativeMouseUp  (input, event))
      hg.Stage.listen(stage, hg.ON_NATIVE_MOUSE_DOWN, event => onNativeMouseDown(input, event))
      hg.Stage.listen(stage, hg.ON_NATIVE_MOUSE_MOVE, event => onNativeMouseMove(input, event))
      hg.Stage.listen(stage, hg.ON_NATIVE_WHEEL     , event => onNativeWheel    (input, event))
      
      return input
    }    
    
    Input.getMouse = function(input) {
      return hg.Vector2(input.mouse)
    }    
    
    Input.getWheel = function(input) {
      return hg.Vector2(input.wheel)
    }

    Input.isKeyUp     = function(input, key) {
      return !(input.keys.get(key) ?? false)
    }

    Input.isKeyDown   = function(input, key) {
      return  (input.keys.get(key) ?? false)
    }

    Input.isMouseUp   = function(input, button) {
      return !(input.buttons.get(button) ?? false)
    }

    Input.isMouseDown = function(input, button) {
      return  (input.buttons.get(button) ?? false)
    }    
    
    Input.isWheelUp   = function(input) {
      return hg.y(input.wheel) < 0
    }    
    
    Input.isWheelDown = function(input) {
      return hg.y(input.wheel) > 0
    }

    Input.poll = function(input) {
      input.wheel = [0, 0]
    }    
    
    function onNativeKeyUp    (input, native) {
      if(Input.isKeyDown(input, native.key)) {
        input.keys.set(native.key, false)
        hg.Stage.dispatch(input.stage, hg.ON_KEY_UP    , {native, key: native.key}, { defer: false })
      }
    }    
    
    function onNativeKeyDown  (input, native) {
      if(Input.isKeyUp(input, native.key)) {
        input.keys.set(native.key, true )
        hg.Stage.dispatch(input.stage, hg.ON_KEY_DOWN  , {native, key: native.key}, { defer: false })
      }
    }    
    
    function onNativeMouseUp  (input, native) {
      if(Input.isMouseDown(input, native.button)) {
        input.buttons.set(native.button, false)
        hg.Stage.dispatch(input.stage, hg.ON_MOUSE_UP  , {native, button: native.button}, { defer: false })
      }
    }    
    
    function onNativeMouseDown(input, native) {
      if(Input.isMouseUp(input, native.button)) {
        input.buttons.set(native.button, true )
        hg.Stage.dispatch(input.stage, hg.ON_MOUSE_DOWN, {native, button: native.button}, { defer: false })
      }
    }    
    
    function onNativeMouseMove(input, native) {
      let [x, y] = hg.Stage.logicalToVirtual(input.stage, [
        native.offsetX, 
        native.offsetY
      ])
      x   =   Math.floor(x)
      y   =   Math.floor(y)
      input.mouse = [x , y]
      hg.Stage.dispatch(input.stage, hg.ON_MOUSE_MOVE, {
        native, x, y
      }, { defer: false})
    }    function onNativeWheel    (input, native) {
      const dx = native.deltaX
      const dy = native.deltaY
      input.wheel = [dx, dy]
      hg.Stage.dispatch(input.stage, hg.ON_WHEEL, {
        native, dx, dy
      }, { defer: false })
    }

    return this.Input = Input
  },
  
  get Asset() {
    delete this.Asset

    const Asset = { }

    Asset.Image = function(url, id) {
      return { type: hg.IMAGE_ASSET, url, id: id ?? uniqueImageId() }
    }

    Asset.Audio = function(url, id) {
      return { type: hg.AUDIO_ASSET, url, id: id ?? uniqueAudioId() }
    }

    Asset.Text = function(url, id) {
      return { type: hg. TEXT_ASSET, url, id: id ?? uniqueTextId() }
    }

    Asset.Json = function(url, id) {
      return { type: hg. JSON_ASSET, url, id: id ?? uniqueJsonId() }
    }

    Asset.Blob = function(url, id) {
      return { type: hg. BLOB_ASSET, url, id: id ?? uniqueBlobId() }
    }

    Asset.load = async function(asset) {
      switch(asset.type) {
        case hg.IMAGE_ASSET: return Asset.loadImage(asset.url)
        case hg.AUDIO_ASSET: return Asset.loadAudio(asset.url)
        case hg. TEXT_ASSET: return Asset.loadText (asset.url)
        case hg. JSON_ASSET: return Asset.loadJson (asset.url)
        case hg. BLOB_ASSET: return Asset.loadBlob (asset.url)
      }
    }

    Asset.loadAll = async function(assets) {
      return Promise.all(assets.map(Asset.load))
    }

    Asset.loadImage = async function(url) {
      return new Promise((resolve, reject) => {
        const image = new Image()
        image.onload  = () => resolve(image)
        image.onerror = () => reject (     )
        image.src = url
      })
    }

    Asset.loadAudio = async function(url) {
      return new Promise((resolve, reject) => {
        const audio = new Audio()
        image.onload  = () => resolve(image)
        image.onerror = () => reject (     )
        image.src = url
      })
    }

    Asset.loadText  = async function(url) {
      return fetch(url).then(response => response.text())
    }

    Asset.loadJson  = async function(url) {
      return fetch(url).then(response => response.json())
    }

    Asset.loadBlob  = async function(url) {
      return fetch(url).then(response => response.blob())
    }    

    function uniqueImageId() {
      return `hg-image-${crypto.randomUUID()}`
    }

    function uniqueAudioId() {
      return `hg-audio-${crypto.randomUUID()}`
    }

    function uniqueTextId() {
      return `hg-text-${crypto.randomUUID()}`
    }

    function uniqueJsonId() {
      return `hg-json-${crypto.randomUUID()}`
    }

    function uniqueBlobId() {
      return `hg-blob-${crypto.randomUUID()}`
    }

    return this.Asset = Asset
  },

  get Cache() {
    delete this.Cache

    function Cache() {
      return {
        image: new Map(),
        audio: new Map(),
        text : new Map(),
        json : new Map(),
        blob : new Map()
      }
    }

    Cache.loadAll = async function(cache, assets) {
      return Promise.all(assets.map(asset => Cache.loadAsset(cache, asset)))
    }

    Cache.loadAsset = async function(cache, asset) {
      switch(asset.type) {
        case hg.IMAGE_ASSET: return Cache.loadImage(cache, asset.url, asset.id)
        case hg.AUDIO_ASSET: return Cache.loadAudio(cache, asset.url, asset.id)
        case hg. TEXT_ASSET: return Cache.loadText (cache, asset.url, asset.id)
        case hg. JSON_ASSET: return Cache.loadJson (cache, asset.url, asset.id)
        case hg. BLOB_ASSET: return Cache.loadBlob (cache, asset.url, asset.id)
      }
    }

    Cache.loadImage = async function(cache, url, id) {
      if(cache.image.has(id))
        console.warn(`[Cache.loadImage] Image Asset with id ${id} already exists`)
      cache.image.set(id, await hg.Asset.loadImage(url))
    }

    Cache.loadAudio = async function(cache, url, id) {
      if(cache.audio.has(id))
        console.warn(`[Cache.loadAudio] Audio Asset with id ${id} already exists`)
      cache.audio.set(id, await hg.Asset.loadAudio(url))
    }

    Cache.loadText  = async function(cache, url, id) {
      if(cache.text.has(id))
        console.warn(`[Cache.loadText] Text Asset with id ${id} already exists`)
      cache.text.set(id, await hg.Asset.loadText (url))
    }

    Cache.loadJson  = async function(cache, url, id) {
      if(cache.json.has(id))
        console.warn(`[Cache.loadJson] Json Asset with id ${id} already exists`)
      cache.json.set(id, await hg.Asset.loadJson (url))
    }

    Cache.loadBlob  = async function(cache, url, id) {
      if(cache.blob.has(id))
        console.warn(`[Cache.loadBlob] Blob Asset with id ${id} already exists`)
      cache.blob.set(id, await hg.Asset.loadBlob (url))
    }

    Cache.putImage = function(cache, image, assetOrId) {
      cache.image.set(typeof assetOrId === "string" ? assetOrId: assetOrId.id, image)
    }

    Cache.putAudio = function(cache, audio, assetOrId) {
      cache.audio.set(typeof assetOrId === "string" ? assetOrId: assetOrId.id, audio)
    }

    Cache.putText  = function(cache, text, assetOrId) {
      cache.text.set(typeof assetOrId === "string" ? assetOrId: assetOrId.id, text)
    }

    Cache.putJson  = function(cache, json, assetOrId) {
      cache.json.set(typeof assetOrId === "string" ? assetOrId: assetOrId.id, json)
    }

    Cache.putBlob  = function(cache, blob, assetOrId) {
      cache.blob.set(typeof assetOrId === "string" ? assetOrId: assetOrId.id, blob)
    }

    Cache.getImage = function(cache, assetOrId) {
      return cache.image.get(typeof assetOrId === "string" ? assetOrId: assetOrId.id)
    }

    Cache.getAudio = function(cache, assetOrId) {
      return cache.audio.get(typeof assetOrId === "string" ? assetOrId: assetOrId.id)
    }

    Cache.getText  = function(cache, assetOrId) {
      return cache.text.get(typeof assetOrId === "string" ? assetOrId: assetOrId.id)
    }

    Cache.getJson  = function(cache, assetOrId) {
      return cache.json.get(typeof assetOrId === "string" ? assetOrId: assetOrId.id)
    }

    Cache.getBlob  = function(cache, assetOrId) {
      return cache.blob.get(typeof assetOrId === "string" ? assetOrId: assetOrId.id)
    }

    Cache.freeImage = function(cache, assetOrId) {
      cache.image.delete(typeof assetOrId === "string" ? assetOrId: assetOrId.id)
    }

    Cache.freeAudio = function(cache, assetOrId) {
      cache.audio.delete(typeof assetOrId === "string" ? assetOrId: assetOrId.id)
    }

    Cache.freeText  = function(cache, assetOrId) {
      cache.text.delete(typeof assetOrId === "string" ? assetOrId: assetOrId.id)
    }

    Cache.freeJson  = function(cache, assetOrId) {
      cache.json.delete(typeof assetOrId === "string" ? assetOrId: assetOrId.id)
    }

    Cache.freeBlob  = function(cache, assetOrId) {
      cache.blob.delete(typeof assetOrId === "string" ? assetOrId: assetOrId.id)
    }

    return this.Cache = Cache
  },

  get Atlas() {
    delete this.Atlas

    function Atlas(image, cols=1, rows=1) {
      return {
        image,
        cols,
        rows,
        w: Math.floor(image.width  / cols),
        h: Math.floor(image.height / rows)
      }
    }

    Atlas.draw = function(context, atlas, i, x=0, y=0, w=0, h=0) {
      context.g.drawImage(
        atlas.image,
        atlas.w * Math.floor(i % atlas.cols),
        atlas.h * Math.floor(i / atlas.cols),
        atlas.w, 
        atlas.h,
        x, y, 
        w || atlas.w, 
        h || atlas.h
      )
    }

    Atlas.fromCache = function(cache, assetOrId, cols=1, rows=1) {
      const image = hg.Cache.getImage(cache, assetOrId)
      return hg.Atlas(image, cols, rows)
    }

    return this.Atlas = Atlas
  },

  get Sprite() {
    delete this.Sprite

    const PLAYING = "__PLAYING__"
    const LOOPING = "__LOOPING__"
    const STOPPED = "__STOPPED__"

    function Sprite(atlas, frames) {

      if(!Array.isArray(frames)) {
        let _frames = []
        for(let i = 0; i < frames ?? atlas.rows * atlas.cols; i++)
          _frames.push(i)
        frames = _frames
      }

      return {
        atlas,
        frame: 0,
        speed: 0,
        mode : STOPPED,
        frames
      }
    }

    Sprite.play = function(sprite, speed, frame) {
      sprite.mode = PLAYING
      sprite.speed = speed ?? sprite.speed
      sprite.frame = frame ?? sprite.frame
    }

    Sprite.loop = function(sprite, speed, frame) {
      sprite.mode = LOOPING
      sprite.speed = speed ?? sprite.speed
      sprite.frame = frame ?? sprite.frame
    }

    Sprite.stop = function(sprite, frame) {
      sprite.mode = STOPPED
      sprite.frame = frame ?? sprite.frame
    }

    Sprite.tick = function(context, sprite) {
      switch(sprite.mode) {

        case PLAYING: {
          sprite.frame += sprite.speed * context.dt
          if(sprite.frame >= sprite.frames.length)
            Sprite.stop(sprite, sprite.frames.length - 1)
          if(sprite.frame < 0)
            Sprite.stop(sprite,                        0)
        } break;

        case LOOPING: {
          sprite.frame += sprite.speed * context.dt
          while(sprite.frame >= sprite.frames.length)
            sprite.frame -= sprite.frames.length
          while(sprite.frame < 0)
            sprite.frame += sprite.frames.length
        } break;

        case STOPPED: {
          // do nothing
        } break;
      }
    }

    Sprite.draw = function(context, sprite, x=0, y=0, w=0, h=0) {
      hg.Atlas.draw(context, sprite.atlas, sprite.frames[Math.floor(sprite.frame)], x, y, w, h)
    }

    Sprite.fromCache = function(cache, assetOrId, cols=1, rows=1, frames=undefined) {
      return hg.Sprite(hg.Atlas.fromCache(cache, assetOrId, cols, rows), frames)
    }

    return this.Sprite = Sprite
  },

  get Vector() {

    function Vector(...a) {
      return Vector.squash(...a)
    } 
    
    Vector.squish = function(   a) {
      if(typeof a === "number") return a
      return a.reduce((b, c) => {
        const d = squish(c)
        if(typeof d === "number") return [...b,    d]
        else                      return [...b, ...d]
      }, new Array())
    }    
    
    Vector.squash = function(...a) {
      if(a.length === 1 && typeof a[0] === "number") return a[0]
      return squish(a)
    }
    
    Vector.x = function(a) {
      return typeof a === "number" ? a : a[hg.X] ?? 0
    }    
    
    Vector.y = function(a) {
      return typeof a === "number" ? a : a[hg.Y] ?? 0
    }    

    Vector.z = function(a) {
      return typeof a === "number" ? a : a[hg.Z] ?? 0
    }    

    Vector.w = function(a) {
      return typeof a === "number" ? a : a[hg.W] ?? 0
    }

    return this.Vector = Vector
  },

  get Vector2() {
    delete this.Vector2    

    function Vector2(...a) {
      const b = hg.Vector(...a)
      return [
        hg.Vector.x(b),
        hg.Vector.y(b)
      ]
    }    
    
    Vector2.toString = function(a) {
      return `<Vector2 ${hg.Vector.x(a)}, ${hg.Vector.y(a)}>`
    }

    return this.Vector2 = Vector2
  },

  get Vector3() {
    delete this.Vector3   
    

    function Vector3(...a) {
      const b = hg.Vector(...a)
      return [
        hg.Vector.x(b),
        hg.Vector.y(b),
        hg.Vector.z(b)
      ]
    }    
    
    Vector3.toString = function(a) {
      return `<Vector3 ${hg.Vector.x(a)}, ${hg.Vector.y(a)}, ${hg.Vector.z(a)}>`
    }

    return this.Vector3 = Vector3
  },

  get Vector4() {
    delete this.Vector4    

    function Vector4(...a) {
      const b = hg.Vector(...a)
      return [
        hg.Vector.x(b),
        hg.Vector.y(b),
        hg.Vector.z(b),
        hg.Vector.w(b)
      ]
    }    
    
    Vector4.toString = function(a) {
      return `<Vector4 ${hg.Vector.x(a)}, ${hg.Vector.y(a)}, ${hg.Vector.z(a)}, ${hg.Vector.w(a)}>`
    }

    return this.Vector4 = Vector4
  }, 

  get STAGE() {
    delete this.STAGE
    return this.STAGE = hg.Stage()
  },

  get CACHE() {
    delete this.CACHE
    return this.CACHE = hg.Cache()
  },
  
  get ON_CHANGE() { return "__ON_CHANGE__" },  
  get ON_RESIZE() { return "__ON_RESIZE__" },  
  
  get ON_NATIVE_KEY_UP    () { return "__ON_NATIVE_KEY_UP__"     },    
  get ON_NATIVE_KEY_DOWN  () { return "__ON_NATIVE_KEY_DOWN__"   },  
  get ON_NATIVE_MOUSE_UP  () { return "__ON_NATIVE_MOUSE_UP__"   },  
  get ON_NATIVE_MOUSE_DOWN() { return "__ON_NATIVE_MOUSE_DOWN__" },  
  get ON_NATIVE_MOUSE_MOVE() { return "__ON_NATIVE_MOUSE_MOVE__" },  
  get ON_NATIVE_WHEEL     () { return "__ON_NATIVE_WHEEL__"      },  
  
  get ON_KEY_UP    () { return "__ON_KEY_UP__"     },    
  get ON_KEY_DOWN  () { return "__ON_KEY_DOWN__"   }, 
  get ON_MOUSE_UP  () { return "__ON_MOUSE_UP__"   },  
  get ON_MOUSE_DOWN() { return "__ON_MOUSE_DOWN__" }, 
  get ON_MOUSE_MOVE() { return "__ON_MOUSE_MOVE__" },    
  get ON_WHEEL     () { return "__ON_WHEEL__"      },  
  
  get IMAGE_ASSET() { return "__IMAGE__" },  
  get AUDIO_ASSET() { return "__AUDIO__" },  
  get TEXT_ASSET () { return "__TEXT__"  }, 
  get JSON_ASSET () { return "__JSON__"  },  
  get BLOB_ASSET () { return "__BLOB__"  },
  
  get X() { return 0 },  
  get Y() { return 1 },  
  get Z() { return 2 },  
  get W() { return 3 },

  get vec2() {
    delete this.vec2
    return this.vec2 = hg.Vector2
  },

  get vec3() {
    delete this.vec3
    return this.vec3 = hg.Vector3
  },

  get vec4() {
    delete this.vec4
    return this.vec4 = hg.Vector4
  },

  get x() {
    delete this.x
    return this.x = hg.Vector.x
  },

  get y() {
    delete this.y
    return this.y = hg.Vector.y
  },

  get z() {
    delete this.z
    return this.z = hg.Vector.z
  },

  get w() {
    delete this.w
    return this.w = hg.Vector.w
  },

  mount({stage, cache, scene}, assets=[]) {
    if(!stage) {
      stage = hg.STAGE
      console.warn("[hg.mount] No Stage provided, reverting to default Stage")
    }

    if(!cache) {
      cache = hg.CACHE
      console.warn("[hg.mount] No Cache provided, reverting to default Cache")
    }

    hg.Cache.loadAll(cache, assets).then(() => {
      hg.Stage.scene(stage, scene )
    })
  }
}

console.log(hg.Version.toString(hg.VERSION))

window.hg = hg