import React, { useState } from "react";
import style from "./App.module.less";
import { FiveGame } from "./FiveGame";
import { GreetingCard } from "./GreetingCard";

function LinkTile(props: { href: string; children: React.ReactNode }) {
  return (
    <div className={style.linkTitleWrapper}>
      <span
        className={style.linkTitle}
        onClick={() => (location.href = props.href)}
      >
        <span className={style.linkTitleBg}></span>
        <span className={style.linkTitleStatic}>{props.children}</span>
        <span className={style.linkTitleMoving}>
          <span className={style.linkTitleMovingInner}>{props.children}</span>
        </span>
      </span>
    </div>
  );
}

function Doc() {
  return (
    <div className={style.doc}>
      <LinkTile href="#fivegame">黑白五子棋</LinkTile>
      <LinkTile href="#greetingcard">贺卡</LinkTile>
      <img src="" />
    </div>
  );
}

function App() {
  const [hash, setHash] = useState(window.location.hash);

  React.useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      {hash === "" && <Doc />}
      {hash === "#fivegame" && <FiveGame />}
      {hash === "#greetingcard" && <GreetingCard />}
    </>
  );
}

export default App;
