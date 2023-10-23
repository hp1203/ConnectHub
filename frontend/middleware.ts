export { default } from "next-auth/middleware"

export const config = { matcher: ["/admin", "/admin/links", "/admin/appearance", "/admin/settings"] }