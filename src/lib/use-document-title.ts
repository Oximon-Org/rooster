import * as React from "react"

const BASE_TITLE = "Roster"

export function useDocumentTitle(title?: string) {
  React.useEffect(() => {
    document.title = title ? `${title} · ${BASE_TITLE}` : BASE_TITLE
  }, [title])
}
