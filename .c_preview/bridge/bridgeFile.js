import { render } from "../preset/react.js";
export const bridgeData = {
    "workspaceFolder": "file:///f%3A/React.js/Personal KB/KB-front(vite)",
    "serverRootDir": "",
    "previewFolderRelPath": "preview",
    "activeFileRelPath": "src/components/home/sidebar/components/new-button.tsx",
    "mapFileRelPath": "src/components/home/sidebar/components/new-button.tsx",
    "presetName": "react",
    "workspaceFolderName": "KB-front(vite)"
};
export const preview = () => render(getMod);
const getMod = () => import("../../src/components/home/sidebar/components/new-button.tsx");