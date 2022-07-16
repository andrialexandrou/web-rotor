type Heading = {
    level: number
    textContent: string
    'data-id': string
}

type HeadingNodeId = `h-${number}`
type LandmarkNodeId = `l-${number}`
type LinkNodeId = `a-${number}`

export type Message = {
    id: 'init' | 'page_content' | 'jump'
    content?:  {
        headings?: Array<Heading>
    }
    node?: HeadingNodeId | LandmarkNodeId | LinkNodeId
}
