type Heading = {
    level: number
    textContent: string | null
    'data-id': HeadingNodeId
}

type HeadingNodeId = `h-${number}`
type LandmarkNodeId = `l-${number}`
type LinkNodeId = `a-${number}`

export type NodeId = HeadingNodeId | LandmarkNodeId | LinkNodeId
export type Headings = Array<Heading>

export function isHeadingNode(thisNode: NodeId): thisNode is HeadingNodeId {
    return thisNode.startsWith('h-');
}

export type Message = {
    id: 'init' | 'page_content' | 'jump'
    content?:  {
        headings?: Headings
    }
    node?: NodeId
}
