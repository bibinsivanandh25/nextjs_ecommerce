import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function TextEditor({
  EditorHeight = "100px",
  getContent = () => {},
  content = "",
}) {
  return (
    <div className="w-95p">
      <SunEditor
        className="bg-primary"
        height={EditorHeight}
        placeholder="Add a Reply..."
        name="content"
        defaultValue={content}
        onChange={(text) => {
          getContent(text);
        }}
        setOptions={{
          showPathLabel: false,
          resizingBar: false,

          colorList: [
            // ["#ff0000", "#ff5e00", "#ffe400", "#abf200"],
            // ["#00d8ff", "#0055ff", "#6600ff", "#ff00dd"],
          ],
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
      {/* <div
        className="ms-4"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      /> */}
    </div>
  );
}
