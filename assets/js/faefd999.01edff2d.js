"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2446],{4858:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>a,frontMatter:()=>t,metadata:()=>i,toc:()=>o});var d=n(4848),r=n(8453);const t={},c="Data Types",i={id:"Resources/Python/Data Types",title:"Data Types",description:"In a modern computer all data exists in the form of a binary sequence. Take the following string of bytes as an example -",source:"@site/docs/Resources/Python/Data Types.md",sourceDirName:"Resources/Python",slug:"/Resources/Python/Data Types",permalink:"/docs/Resources/Python/Data Types",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"resources",previous:{title:"Control Flow",permalink:"/docs/Resources/Python/Control Flow"},next:{title:"Functions",permalink:"/docs/Resources/Python/Functions"}},l={},o=[{value:"List",id:"list",level:3},{value:"Set",id:"set",level:3}];function h(e){const s={a:"a",code:"code",em:"em",h1:"h1",h3:"h3",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s.h1,{id:"data-types",children:"Data Types"}),"\n",(0,d.jsxs)(s.p,{children:["In a modern computer all data exists in the form of a ",(0,d.jsx)(s.a,{href:"/docs/Resources/Glossary/Binary",children:"binary"})," sequence. Take the following string of ",(0,d.jsx)(s.a,{href:"/docs/Resources/Glossary/Byte",children:"bytes"})," as an example -"]}),"\n",(0,d.jsx)(s.p,{children:(0,d.jsx)(s.code,{children:"01101000 01100101 01101100 01101100 01101111 01110111 01101111 01110010 01101100 01100100"})}),"\n",(0,d.jsxs)(s.p,{children:["If I were to ask you to determine the meaning of the binary string above, then you might be confused and rightfully so. Without context, the several billions of bits that comprise your computer's ",(0,d.jsx)(s.a,{href:"/docs/Resources/Glossary/Memory",children:"memory"})," are meaningless to a human reader, so how does your program know what to do with them?"]}),"\n",(0,d.jsxs)(s.p,{children:["This the purpose of data types, which describe how certain data should be handled by your program. In the earlier example, the binary sequence is actually an ",(0,d.jsx)(s.a,{href:"https://en.wikipedia.org/wiki/ASCII",children:"ASCII"})," encoded string of characters, which means that each ",(0,d.jsx)(s.a,{href:"/docs/Resources/Glossary/Byte",children:"byte"})," corresponds to one of 256 symbols indicated by the standard. Referencing the following section of the ASCII standard we can see that our string of ",(0,d.jsx)(s.a,{href:"/docs/Resources/Glossary/Byte",children:"bytes"})," actually decodes to the text ",(0,d.jsx)(s.code,{children:"helloworld"}),"."]}),"\n",(0,d.jsxs)(s.table,{children:[(0,d.jsx)(s.thead,{children:(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.th,{children:(0,d.jsx)(s.strong,{children:"Symbol"})}),(0,d.jsx)(s.th,{children:(0,d.jsx)(s.strong,{children:"Binary"})}),(0,d.jsx)(s.th,{children:(0,d.jsx)(s.strong,{children:"Symbol"})}),(0,d.jsx)(s.th,{children:"Binary"})]})}),(0,d.jsxs)(s.tbody,{children:[(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"a"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01100001"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"n"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01101110"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"b"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01100010"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"o"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01101111"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"c"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01100011"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"p"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01110000"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"d"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01100100"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"q"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01110001"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"e"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01100101"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"r"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01110010"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"f"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01100110"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"s"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01110011"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"g"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01100111"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"t"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01110100"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"h"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01101000"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"u"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01110101"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"i"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01101001"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"v"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01110110"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"j"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01101010"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"w"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01110111"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"k"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01101011"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"x"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01111000"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"l"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01101100"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"y"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01111001"})})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"m"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01101101"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"z"})}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"01111010"})})]})]})]}),"\n",(0,d.jsxs)(s.p,{children:["Standards are important to the world of computing and ASCII is just one such example. Most modern text is encoded using the ubiquitous ",(0,d.jsx)(s.a,{href:"https://en.wikipedia.org/wiki/UTF-8",children:"UTF-8"})," standard which includes the same 256 characters as its ASCII predecessor, while also making room for an additional 1.1 million symbols. Beside character encodings, another common standard is ",(0,d.jsx)(s.a,{href:"https://en.wikipedia.org/wiki/IEEE_754",children:"IEEE-754"})," which describes how to encode a wide range of numbers in binary."]}),"\n",(0,d.jsxs)(s.p,{children:["One of the interesting consequences of contextual data types is that different values can have the same underlying binary representation in ",(0,d.jsx)(s.a,{href:"/docs/Resources/Glossary/Memory",children:"memory"}),". Take, for example, the 32-bit binary sequence ",(0,d.jsx)(s.code,{children:"00111111 10000000 00000000 00000000"})," which represents the integer number ",(0,d.jsx)(s.code,{children:"1065353216"}),", meanwhile that same sequence represents the IEEE-754 floating-point number ",(0,d.jsx)(s.code,{children:"1.0"}),"."]}),"\n",(0,d.jsx)(s.p,{children:"In Python some important data types include -"}),"\n",(0,d.jsxs)(s.table,{children:[(0,d.jsx)(s.thead,{children:(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.th,{children:"Name"}),(0,d.jsx)(s.th,{children:"Symbol"}),(0,d.jsx)(s.th,{children:(0,d.jsx)(s.strong,{children:"Description"})})]})}),(0,d.jsxs)(s.tbody,{children:[(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"None"}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"None"})}),(0,d.jsxs)(s.td,{children:["In Python, ",(0,d.jsx)(s.code,{children:"None"})," is used to describe something that has no value. It is denoted via the symbol ",(0,d.jsx)(s.code,{children:"None"}),"."]})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"Integer"}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"int"})}),(0,d.jsxs)(s.td,{children:["An integer is a whole number, meaning without a fractional part. In Python an ",(0,d.jsx)(s.em,{children:"integer literal"})," is denoted using numeric characters ",(0,d.jsx)(s.code,{children:"0 - 9"}),"and signs ",(0,d.jsx)(s.code,{children:"+, -"}),"."]})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"Float"}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"float"})}),(0,d.jsxs)(s.td,{children:["A float or ",(0,d.jsx)(s.em,{children:"floating-point number"})," is a fractional number. In Python a ",(0,d.jsx)(s.em,{children:"float literal"})," is denoted using numeric characters ",(0,d.jsx)(s.code,{children:"0 - 9"}),", signs ",(0,d.jsx)(s.code,{children:"-, +"}),", and a decimal point ",(0,d.jsx)(s.code,{children:"."})]})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"String"}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"str"})}),(0,d.jsxs)(s.td,{children:["A string is a sequence of ",(0,d.jsx)(s.strong,{children:"characters"})," or text symbols. In Python a ",(0,d.jsx)(s.em,{children:"string literal"})," is denoted using single ",(0,d.jsx)(s.code,{children:"'"})," or double ",(0,d.jsx)(s.code,{children:'"'})," quotes."]})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"Boolean"}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"bool"})}),(0,d.jsxs)(s.td,{children:["A boolean is a special data type that can be either ",(0,d.jsx)(s.code,{children:"True"})," or ",(0,d.jsx)(s.code,{children:"False"}),"."]})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"List"}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"list"})}),(0,d.jsxs)(s.td,{children:["A list is a sequence of elements. In some languages a list is referred to as an array. In Python, a ",(0,d.jsx)(s.em,{children:"list literal"})," is denoted using square brackets ",(0,d.jsx)(s.code,{children:"[ ]"})," and commas ",(0,d.jsx)(s.code,{children:","}),"."]})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"Set"}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"set"})}),(0,d.jsxs)(s.td,{children:["A set is a ",(0,d.jsx)(s.strong,{children:"list"})," that contains no duplicates. In Python, a ",(0,d.jsx)(s.em,{children:"set literal"})," is denoted using curly braces ",(0,d.jsx)(s.code,{children:"{ }"})," and commas ",(0,d.jsx)(s.code,{children:","}),"."]})]}),(0,d.jsxs)(s.tr,{children:[(0,d.jsx)(s.td,{children:"Dictionary"}),(0,d.jsx)(s.td,{children:(0,d.jsx)(s.code,{children:"dict"})}),(0,d.jsx)(s.td,{})]})]})]}),"\n",(0,d.jsx)(s.h3,{id:"list",children:"List"}),"\n",(0,d.jsx)(s.pre,{children:(0,d.jsx)(s.code,{className:"language-py",children:'# a list of strings\nmyList = [ "Apple", "Banana", "Coconut", "Apple" ]\nprint(myList) # [ "Apple", "Banana", "Coconut", "Apple" ]\n\n# a list of integers\nmyList = [ 1, 2, 2, 3, 3, 3 ]\nprint(myList) # [ 1, 2, 2, 3, 3, 3 ]\n'})}),"\n",(0,d.jsx)(s.h3,{id:"set",children:"Set"}),"\n",(0,d.jsx)(s.pre,{children:(0,d.jsx)(s.code,{className:"language-py",children:'# a set of strings\nmySet = { "Apple", "Banana", "Coconut", "Apple" }\nprint(mySet) # { "Apple", "Banana", "Coconut" }\n\n# a set of integers\nmySet = { 1, 2, 2, 3, 3, 3 }\nprint(mySet) # { 1, 2, 3 }\n'})})]})}function a(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,d.jsx)(s,{...e,children:(0,d.jsx)(h,{...e})}):h(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>c,x:()=>i});var d=n(6540);const r={},t=d.createContext(r);function c(e){const s=d.useContext(t);return d.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function i(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),d.createElement(t.Provider,{value:s},e.children)}}}]);