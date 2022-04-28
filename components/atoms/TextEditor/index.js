import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import styles from "./TextEditor.module.css";
import Image from "next/image";
import logo from "../../../public/assets/favicon.png";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function TextEditor() {
  const [content, setContent] = useState("");

  // useEffect(() => {
  //   // if (typeof window !== undefined) {
  //   console.log(document.getElementsByClassName("sun-editor"));
  //   let element = document.getElementsByClassName("sun-editor");
  //   element.classList.add(styles.toolBarClassName);
  //   // }
  // }, []);
  console.log(content, " <img>asds</img>", "content");
  useEffect(() => {
    let element = document.getElementsByClassName("se-btn-tray");
    element.length > 0 ? element.classList.remove("se-btn-tray") : null;
  }, []);
  return (
    <div>
      {/* <Image src={logo} alt="" width="100px" height="40px" /> */}

      <SunEditor
        className="bg-primary"
        height="250px"
        placeholder="Add a Reply..."
        name="content"
        defaultValue={content}
        onChange={(text) => setContent(text)}
        setOptions={{
          display: "flex",
          showPathLabel: false,
          resizingBar: false,
          // paragraphStyles: [
          //   {
          //     name: "Box",
          //     class: styles.toolBarClassName,
          //   },
          // ],
          colorList: [
            // ["#ff0000", "#ff5e00", "#ffe400", "#abf200"],
            // ["#00d8ff", "#0055ff", "#6600ff", "#ff00dd"],
          ],
          height: 500,
          buttonList: [
            ["fontSize"],
            ["bold"],
            ["underline"],
            ["italic"],
            ["strike"],
            ["align"],
            ["list"],
            ["fontColor"],
            ["hiliteColor"],
          ],
          menu: {
            spaced: "Spaced",
          },
        }}
      />
      <div
        className="ms-4"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
}
