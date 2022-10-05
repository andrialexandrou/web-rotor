type Link = {
    content: string
    type: 'link'
    'data-id': LinkNodeId
    href: string | null
}

type Heading = {
    level: number
    content: string | null
    type: 'heading'
    'data-id': HeadingNodeId
}

type Role = 'banner' | 'navigation' | 'main' | 'search' | 'footer' | 'aside' | 'contentinfo' 

type Landmark = {
    content: string | null
    type: 'landmark'
    role: Role
    'data-id': LandmarkNodeId
}

type HeadingNodeId = `h-${number}`
type LandmarkNodeId = `d-${number}`
type LinkNodeId = `k-${number}`

export type NodeId = HeadingNodeId | LandmarkNodeId | LinkNodeId
export type Headings = Array<Heading>
export type Landmarks = Array<Landmark>
export type Links = Array<Link>

export function isHeadingNode(thisNode: NodeId): thisNode is HeadingNodeId {
    return thisNode.startsWith('h-');
}

export type PageContent = {
    headings?: Headings
    landmarks?: Landmarks
    links?: Links
}

export type Message = {
    id: 'init' | 'page_content' | 'jump'
    content?:  PageContent
    node?: NodeId
}
