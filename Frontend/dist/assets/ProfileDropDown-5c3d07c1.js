import{j as e,L as l,_ as s}from"./index-40d7d4fb.js";const c=({userData:r})=>{const o=()=>s.error("Not verified by admin",{duration:2e3,style:{color:"#fff",background:"black"}});return e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex flex-col dropDownProfile",children:e.jsxs("ul",{className:"flex flex-col gap-4 font-semibold text-sm cursor-pointer",children:[e.jsx(l,{to:"/account",children:e.jsx("li",{className:"hover:bg-blue-gray-100 py-2",children:"Profile"})}),e.jsx("hr",{className:"border border-gray-400"}),(r==null?void 0:r.verify)===!1?e.jsx("li",{onClick:o,className:"hover:bg-blue-gray-100 py-2",children:"Post Your Job"}):(r==null?void 0:r.verify)===!0?e.jsx(l,{to:"/details",className:"hover:bg-blue-gray-100 py-2",children:e.jsx("li",{children:"Post Your Job"})}):e.jsx(l,{to:"/details",className:"hover:bg-blue-gray-100 py-2",children:e.jsx("li",{children:"Add Details"})}),e.jsx("hr",{className:"border border-gray-400"}),e.jsx(l,{to:"/saved",children:e.jsx("li",{className:"hover:bg-blue-gray-100 py-2",children:"Saved Items"})})]})})})};export{c as default};