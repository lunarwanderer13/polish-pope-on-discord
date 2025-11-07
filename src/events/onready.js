export const name = "clientReady";
export const once = false;
export const on = true;
export function execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);
}