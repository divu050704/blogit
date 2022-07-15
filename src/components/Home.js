import React from "react";
import DOMPurify from "dompurify";
import Editor from "./Editor";
import Prism from "prismjs";
export default function Home(props) {
  const [array, setArray] = React.useState([]);
  const [isBlogOpen, setIsBlogOpen] = React.useState(false);
  const [blogOpened, setBlogOpened] = React.useState(0);
  const [createNew, setCreateNew] = React.useState(false);
  React.useEffect(() => {
    Prism.highlightAll();
  }, [isBlogOpen]);
  React.useEffect(() => {
    fetch("https://login-backend.divu050704.repl.co/api/posts")
      .then((res) => res.json())
      .then((data) => setArray(data));
  }, [createNew, isBlogOpen]);
  let data2jsx;
  if (array !== []) {
    data2jsx = array.map((x, index) => (
      <div
        className="data"
        onClick={() => {
          setBlogOpened(index);
          setIsBlogOpen(true);
        }}
        key={x._id}
      >
        <h2 style={{ marginTop: "0" }}>{x.title}</h2>

        <div className="lower">
          <span>
            <strong>Author</strong>: {x.author}
          </span>
          <span>
            <strong>Date</strong>: {x.date}
          </span>
        </div>
        <hr></hr>
      </div>
    ));
  }
  function handleNewBlog() {
    setCreateNew(false);
  }
  function DeleteBlog(id) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id })
    };
    fetch("https://login-backend.divu050704.repl.co/api/delete", requestOptions)
      .then((res) => res.json())
      .then((last) => {
        setIsBlogOpen(false);
      });
  }
  return (
    <div>
      <nav className="navbar--home">
        <font>Blogit</font>
        <nav className="navbar--home-content">
          <button onClick={props.handleLogOut}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAWJJREFUSEvVld1Rw0AMhL+tAKgAqACogNABHQAVQAeEDkIHoQM6ACoIqQDoIFQgZhlf5sY+n+2HPERP/jlrpd2VLHYc2nF+JgFERLggSaO/G33QifcTICJOJH2XOsjf9WlZpSgi5sBj4rxNUXM/l/Q0GSAilsBNLmoPgI8sJd2VQIodRMQCuAd+gGtJnz0UnQOvwDHwLOmhDdIBMK/AF/ALzFLyPhdFhEHegQPgNOmVgEoAiZpORX02zTp+kXSbd1ECcDWXwJUkX2+jAjAD3oAPSb7eRglg43anTGtG30bS0RDA5HVQm/JSB3bMGXCRC1xbio3QK2AtyaJXKUoWLdquBJTNTOebmk2da7CLrHqfH7Zpw2fqwoLbTf+D1o4mud1zOHrQUpKISFr4kWfD7aeJNs+e9OT5Dve9g9byfeqkpnFVq8EfTrM6vGM8QHaXY92sh0V7NbQrGQSolT7m3f4D/AHMvr0ZtXB6CAAAAABJRU5ErkJggg=="
              alt="Log out"
            />
          </button>
          <button onClick={() => setCreateNew(true)}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAFxJREFUSEtjZKAxYKSx+QyjFhAMYZKC6P////9BJjIyMhKtj2iFIINHLSAYYUMniGAuJeglNAXYUhfWVERzC3C5fOjEwagPkENgcJVFpOYLcMlLjiZS9IxaQDC0AFaEOBlExtG1AAAAAElFTkSuQmCC"
              alt="Create"
            />
          </button>
        </nav>
      </nav>
      {!isBlogOpen && !createNew && data2jsx}
      {isBlogOpen && (
        <div className="blog">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALNJREFUSEvllNENgzAMBY8N2ISO0I7AJKzQbsQGdATYhBGQJaisKISYmI8KvqM7P9u44uKvupjPfQQ10AEfa0tzWiTwAXisgrdFciTQ8Al4ArOXoBguhewlcIHvCdzgMYErPBRouGWOsbe/1usZiOALNKV0PdtwyFoyAi/rWobFxbbIVZJa061dRUlSf7JLkpxTUZTkSCAz00laoLdsWY5gk8ihM8FTt8hSZPJtboLTwv8XLAoZJhna+F7zAAAAAElFTkSuQmCC"
              alt="go back"
              onClick={() => setIsBlogOpen(false)}
              className="goBack"
              style={{ cursor: "pointer" }}
            />
            {array[blogOpened].author === props.username && (
              <button
                onClick={() => DeleteBlog(array[blogOpened]._id)}
                style={{
                  right: "2rem",

                  backgroundColor: "red",
                  border: "none",
                  color: "white",
                  height: "2rem",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            )}
          </div>
          <h1>{array[blogOpened].title}</h1>
          <hr></hr>
          <div className="lower">
            <span>
              <strong>Author</strong>: {array[blogOpened].author}
            </span>
            <span>
              <strong>Date</strong>: {array[blogOpened].date}
            </span>
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(array[blogOpened].data)
            }}
          ></p>
        </div>
      )}
      {createNew && (
        <Editor username={props.username} handleNewBlog={handleNewBlog} />
      )}
    </div>
  );
}
