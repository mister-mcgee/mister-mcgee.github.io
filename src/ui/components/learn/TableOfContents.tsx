import clsx from "clsx";

export type Heading = {
  text : string;
  slug : string;
  depth: number;
};

export type Headings = Array<Heading>;

export interface NodeOfContents {
  items: Array<Heading | NodeOfContents>;
  depth: number;

  parent ?: NodeOfContents;
}

export function NodeOfContents(depth = 0): NodeOfContents {
  return {
    items: [],
    depth
  }
}

export namespace NodeOfContents {
  export function push(root: NodeOfContents, until = root.depth + 1) {
    while(root.depth < until) {
      const node = NodeOfContents(root.depth + 1);
      root.items.push(node);
      node.parent = root;
      root = node;
    }
    return root;    
  }

  export function pull(root: NodeOfContents, until = root.depth - 1) {
    while(root.parent && root.depth > until) {
      root = root.parent;
    }
    return root;
  }
}

export interface TreeOfContents {
  root: NodeOfContents;
}

export function TreeOfContents(): TreeOfContents {
  return {
    root: NodeOfContents()
  }
}

export namespace TreeOfContents {

}

export function toc(headings: Headings, depth=-1): TreeOfContents {
  const tree = TreeOfContents();

  let root = tree.root;
  for(const heading of headings) {
    if(depth >= 0 && heading.depth > depth) continue;

    if(heading.depth === root.depth) {
      // do nothing
    } else if(heading.depth < root.depth) {
      root = NodeOfContents.pull(root, heading.depth);      
    } else if(heading.depth > root.depth) {
      root = NodeOfContents.push(root, heading.depth);
    }

    root.items.push(heading)
  }

  return tree;
}

function isTreeOfContents(a: any): a is TreeOfContents {
  return a.root  !== undefined;
}

function isNodeOfContents(a: any): a is NodeOfContents {
  return a.items !== undefined;
}

function isHeading(a: any): a is Heading {
  return (
    a.text  !== undefined && 
    a.slug  !== undefined && 
    a.depth !== undefined
  );
}

function render(node: NodeOfContents) {

  return <ol key={crypto.randomUUID()} className={clsx(
    node.depth === 2 && "list-[upper-roman]",
    node.depth === 3 && "list-[lower-alpha]",
    node.depth === 4 && "list-[lower-roman]",
    )}>
    {node.items.map((item, i) => {
      if(isHeading(item)) {
        return <li key={i}><a href={`#${item.slug}`} className="text-lg no-underline hover:underline">{item.text}</a></li>
      } else {
        return render(item);
      }
    })}
  </ol>
}

export default function TableOfContents({ headings, depth = 3 }: { headings: Headings, depth?: number }) {
  return (
    <div className="flex flex-col">
      <h2>Table of Contents</h2>
      <div className="rounded-lg border border-base-200 shadow-sm">
        {render(toc(headings, depth).root)}
      </div>
    </div>
  )
}