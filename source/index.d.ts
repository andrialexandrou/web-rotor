type Heading = {
    level: number
    textContent: string | null
    'data-id': HeadingNodeId
}

type Landmark = {
    content: string | null
    'data-id': LandmarkNodeId
}

type HeadingNodeId = `h-${number}`
type LandmarkNodeId = `l-${number}`
type LinkNodeId = `a-${number}`

export type NodeId = HeadingNodeId | LandmarkNodeId | LinkNodeId
export type Headings = Array<Heading>

export function isHeadingNode(thisNode: NodeId): thisNode is HeadingNodeId {
    return thisNode.startsWith('h-');
}

export type PageContent = {
    headings?: Headings,
    landmarks?: Array<Landmark>
}

export type Message = {
    id: 'init' | 'page_content' | 'jump'
    content?:  PageContent
    node?: NodeId
}
