import { mount } from "./ui";
import "./styles.css";

const root = document.querySelector("#app");
if (!root) throw new Error("App-Wurzel fehlt");
mount(root);
