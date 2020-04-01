const SUBSCRIBE_WORKS = {"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription {\n  works {\n   name, website, social_links, long_desc, author_name, interisting_count, img_url, completed_at, client, simple_caption, p}\n}\n"}}
const SUBSCRIBE_POSTS = {"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription {\n  posts {\n   title, p, author_name, img_url, text_content, published_at, view_cont, interisting_count, social_links }\n}\n"}}
const graphqlQuery = {
    SUBSCRIBE_WORKS,
    SUBSCRIBE_POSTS
}

export default graphqlQuery