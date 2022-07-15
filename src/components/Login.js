import React from "react";

export default function Login(props) {
  return (
    <div className="main">
      {props.login && (
        <div className="card">
          <h2
            style={{
              marginLeft: "-2rem",
              padding: "2rem",
              borderLeft: "5px solid #673fd7",
              color: "#673fd7"
            }}
          >
            Login
          </h2>
          <p style={{ color: "red" }}>
            {props.status === "" ? <br /> : props.status}
          </p>
          <input
            id="username"
            value={props.username}
            onChange={props.handleNameChange}
            className="input"
            autoComplete="off"
            placeholder="Username"
          ></input>
          <br></br>
          <br></br>

          <input
            id="passwd"
            type={props.isHidden ? "password" : "text"}
            value={props.passwd}
            onChange={props.handlePasswdChange}
            className="input"
            autoComplete="off"
            placeholder="Password"
          ></input>
          {!props.isHidden && (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXZJREFUSEu1lY0xBEEQRt9lIANEgAiQAREgAyJABkRACESACI4MyIAM1FMzV3O9vT9V9qbqaq92Zvp1f1/P7IINj8WG4xMBN8Ad8D0XuAUY/Bp4B47ngrSALeAV2JsTEiWKkFPgEDgBdoD9Ip1VKuMj8DxUbWZyC5lqhfLeZ6C+LoqQK+AJ+CxEqzkqv7Omqo53mURuNNhUT5RNqVLvIkCT1VztI8TshVbtbxv92mSMYSV/owWcAw/AVzGznoU+TwSofR2u0/xt4KJUtQYww7XJngzra9fvhi6oSa7m2gqGAMaJlfyUdy2jVcFGSCUSdNDT2y0krnNuWc5LKpHAavLQdZF1l3tfindvpX07JlcZqlE+zcRnHBHivO36UYKvLsspJ9ketzIzqwct86QTPHrQZmmGl+V2za6LqvHoYRz74BjAi87u8L+n1WEHeeKVbxAyBsiyz971QuYCRE/qVdP5ZE7NuG+dldTLMm3T/wI6++eUKE3uF0rNaBmjGKsnAAAAAElFTkSuQmCC"
              alt="unhide"
              onClick={props.handleHidden}
              style={{
                cursor: "pointer",
                width: "1rem",
                position: "relative",
                marginLeft: "-1.5rem"
              }}
            />
          )}
          {props.isHidden && (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXJJREFUSEvtlMsxBVEURdcLgJKBTwKIADNGZOCTABkgA6qMfTJgYooIEAEyUBgrtTi33L59X/ebvNm7VV3d1X17r3P22d0DxrwGY9ZnAuh1uM+iGWAT2AG8XgrFJ+AduARu4roKGwZQbB846i3xb4P7TmugGkDxu6zaK+A+jtcAzgGrcWxnXa2VkBKg+EvY8RzWaEfX0jatWgTc24CUACtdARS3Qn12LQBnwDrwBZwDBxnVwnxXiGchvysHOMgL4C3sSeLuuwU2ijb0vITYwSywG101APrbeJgJfhfF+OgTmC6gqUi15ssOugAfwFQh1gXQBYNQtUjQcpGGk4htzqhZ9BjCVYt8OQ25lQZAyF4QakNO0X6IgLSG7A3TkAbl2UpGianhMK5l+qp/0zxyQs24nVlZ/qEZZ6PsYF0t8XIGub9CjOBh5yf2//A4LMyjXbWo1BO0lf3s/JBStXZzHUdLOAn1/U1HbGD4tgmg18KxW/QDiFNTGRLs4rIAAAAASUVORK5CYII="
              alt="hide"
              onClick={props.handleHidden}
              style={{
                cursor: "pointer",
                width: "1rem",
                position: "relative",
                marginLeft: "-1.5rem"
              }}
            />
          )}
          <br></br>
          <br></br>
          <div className="options">
            <button
              onClick={props.submitLogin}
              className={!props.loading ? "button1" : "button1--loading"}
            >
              Log in
            </button>
            <br></br>
            <br></br>
            <h2 style={{ color: "#673fd7" }}>OR</h2>
            <br></br>

            <button onClick={props.handleLoginChange} className="button1">
              Sign up
            </button>
          </div>
        </div>
      )}
      {!props.login && (
        <div class="main">
          <div className="card">
            <h2
              style={{
                marginLeft: "-2rem",
                padding: "2rem",
                borderLeft: "5px solid #673fd7",
                color: "#673fd7"
              }}
            >
              Sign Up
            </h2>
            <p style={{ color: "red" }}>
              {props.status === "" ? <br></br> : props.status}
            </p>
            <input
              id="username"
              value={props.username}
              className="input"
              onChange={props.handleNameChange}
              autoComplete="off"
              placeholder="Username"
            ></input>
            <br></br>
            <br></br>

            <input
              id="passwd"
              type={props.isHidden ? "password" : "text"}
              value={props.passwd}
              onChange={props.handlePasswdChange}
              className="input"
              autoComplete="off"
              placeholder="Password"
            ></input>
            {!props.isHidden && (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXZJREFUSEu1lY0xBEEQRt9lIANEgAiQAREgAyJABkRACESACI4MyIAM1FMzV3O9vT9V9qbqaq92Zvp1f1/P7IINj8WG4xMBN8Ad8D0XuAUY/Bp4B47ngrSALeAV2JsTEiWKkFPgEDgBdoD9Ip1VKuMj8DxUbWZyC5lqhfLeZ6C+LoqQK+AJ+CxEqzkqv7Omqo53mURuNNhUT5RNqVLvIkCT1VztI8TshVbtbxv92mSMYSV/owWcAw/AVzGznoU+TwSofR2u0/xt4KJUtQYww7XJngzra9fvhi6oSa7m2gqGAMaJlfyUdy2jVcFGSCUSdNDT2y0krnNuWc5LKpHAavLQdZF1l3tfindvpX07JlcZqlE+zcRnHBHivO36UYKvLsspJ9ketzIzqwct86QTPHrQZmmGl+V2za6LqvHoYRz74BjAi87u8L+n1WEHeeKVbxAyBsiyz971QuYCRE/qVdP5ZE7NuG+dldTLMm3T/wI6++eUKE3uF0rNaBmjGKsnAAAAAElFTkSuQmCC"
                alt="unhide"
                onClick={props.handleHidden}
                style={{
                  cursor: "pointer",
                  width: "1rem",
                  position: "relative",
                  marginLeft: "-1.5rem"
                }}
              />
            )}
            {props.isHidden && (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXJJREFUSEvtlMsxBVEURdcLgJKBTwKIADNGZOCTABkgA6qMfTJgYooIEAEyUBgrtTi33L59X/ebvNm7VV3d1X17r3P22d0DxrwGY9ZnAuh1uM+iGWAT2AG8XgrFJ+AduARu4roKGwZQbB846i3xb4P7TmugGkDxu6zaK+A+jtcAzgGrcWxnXa2VkBKg+EvY8RzWaEfX0jatWgTc24CUACtdARS3Qn12LQBnwDrwBZwDBxnVwnxXiGchvysHOMgL4C3sSeLuuwU2ijb0vITYwSywG101APrbeJgJfhfF+OgTmC6gqUi15ssOugAfwFQh1gXQBYNQtUjQcpGGk4htzqhZ9BjCVYt8OQ25lQZAyF4QakNO0X6IgLSG7A3TkAbl2UpGianhMK5l+qp/0zxyQs24nVlZ/qEZZ6PsYF0t8XIGub9CjOBh5yf2//A4LMyjXbWo1BO0lf3s/JBStXZzHUdLOAn1/U1HbGD4tgmg18KxW/QDiFNTGRLs4rIAAAAASUVORK5CYII="
                alt="hide"
                onClick={props.handleHidden}
                style={{
                  cursor: "pointer",
                  width: "1rem",
                  position: "relative",
                  marginLeft: "-1.5rem"
                }}
              />
            )}
            <br></br>
            <br></br>
            <div class="options">
              <button
                onClick={props.submitSignup}
                className={!props.loading ? "button1" : "button1--loading"}
              >
                Sign Up
              </button>
              <br></br>
              <h2 style={{ color: "#673fd7" }}>OR</h2>
              <button onClick={props.handleLoginChange} className="button1">
                Log in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
