import { visit } from "unist-util-visit";

interface File {
  _id: string;
  body: any;
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("content:file:beforeParse", (file: File) => {
    if (file._id.endsWith(".md")) {
      if (file.body.includes("noCta")) return;

      const lines = file.body.split("\n");

      // Searching for the second occurrence of a heading
      let headingCount = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("##")) {
          headingCount++;
          if (headingCount === 2) {
            // Insert "::div" before the second heading
            lines.splice(i, 0, ":survey");
          }
        }
      }

      // Joining the lines back nto a single string with modifications
      file.body = lines.join("\n");
    }
  });

  nitroApp.hooks.hook("content:file:afterParse", (file: File) => {
    if (file._id.endsWith(".md")) {
      visit(
        file.body,
        (n: any) => n.tag === "a",
        (node) => {
          if (node.props.href.includes("stakoprichten")) {
            node.props.rel = [];
            return;
          }
          if (node.props.href.includes("rounde")) {
            node.props.rel = [];
            node.props.target = "_blank";
            return;
          }
          node.props.target = "_blank";
          node.props.rel = ["nofollow", "noopener", "noreferrer"];
        },
      );
      //   const regex = /<a\b[^>]*>(.*?)<\/a>/g;
      //   const matches = file.body.match(regex);
      //   if (matches) {
      //     for (const match of matches) {
      //       if (!match.includes("rounde")) {
      //         const modifiedMatch = match.replace("<a", '<a rel="nofollow"');
      //         file.body = file.body.replace(match, modifiedMatch);
      //       }
      //     }
      //   }
    }
  });
});
