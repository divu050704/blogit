import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import DOMPurify from "dompurify";
import { languages } from "@codemirror/language-data";
import { marked } from "marked";
import React from "react";
import Prism from "prismjs";
import "./onedark.css";
export default function Editor(props) {
  const [code, setCode] = React.useState("");
  const [html, setHtml] = React.useState("");
  const [openPreview, setOpenPreview] = React.useState(false);

  function Update(value) {
    setCode(value);
    setHtml(marked.parse(value));
  }
  React.useEffect(() => {
    Prism.highlightAll();
  }, [openPreview]);
  function Upload(){
    let title = prompt("Please enter title for the blog")
    const today = new Date()
    const month = today.toLocaleString('default', { month: 'long' })
    const date = today.getDate()
    const year = today.getFullYear()
    const finalDate = date + " " + month + " " + year
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "title": title, "author": props.username, "date": finalDate, "data" :  DOMPurify.sanitize(html)})
    };
    fetch("https://login-backend.divu050704.repl.co/api/new", requestOptions)
      .then(res => res.json())
      .then(last => props.handleNewBlog())
}
  return (
    <div className="Editor">
      
      <div className="navbar">
        
        <div className="navbar--main">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAMtJREFUSEvllNsNwjAMRa83wM0gMAKMwCSsQDdigzICTBImaFB4RGrSJrHifiD6VanROb6Oa8LKD63Mx58IrLUbjOOJjemlLS226AV3bgCwg3M9G3OWSLKCCRy4g2jPzA8VgQbcFzKbQAs+K9CEJwJt+EQQwSX3mJzlrgutDy8fwRXAtokOYFbgoZHkBqKDdCzj4pIp0pbkxvTbrqYki3+yVpKaVdGUpHbZvSVER2a+SKasKAjTBfhFJ4Iv7iJJhaWzVQlKkNz33xc8ATpsdhmiyL3oAAAAAElFTkSuQmCC" alt="go back"  onClick={props.handleNewBlog}
        style={{cursor: "pointer", margin: "0.5rem"}} />
          <span
            style={
              !openPreview
                ? { backgroundColor: "#282c34", color: "whitesmoke" }
                : {}
            }
            onClick={() => setOpenPreview(false)}
          >
            Editor
          </span>
          <span
            style={
              openPreview
                ? { backgroundColor: "#282c34", color: "whitesmoke" }
                : {}
            }
            onClick={() => setOpenPreview((prev) => true)}
          >
            Preview
          </span>
          <button onClick={Upload} className="uploadbutton">Upload</button>
        </div>
        
      </div>
      
      {openPreview && (
        <div
          style={{ margin: "1rem" }}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      )}
      {!openPreview && (
        <CodeMirror
          value={code}
          height="89vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages })
          ]}
          theme="dark"
          onChange={(value, viewUpdate) => {
            Update(value);
          }}
        />
      )}
    </div>
  );
}
