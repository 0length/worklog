const SUBSCRIBE_WORKS = `{"id":"1","type":"start","payload":{"variables":{},"extensions":{},"operationName":null,"query":"subscription {  works {    name, website, social_links, long_desc, author_name, interisting_count, img_url, completed_at, client, simple_caption, p}  }}"}}`

const graphqlQuery = {
    SUBSCRIBE_WORKS
}

export default graphqlQuery