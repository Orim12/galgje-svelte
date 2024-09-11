import nestedDocs from "@payloadcms/plugin-nested-docs"

function generateNestedDocs(collections: string[]) {
    return nestedDocs({
        collections: collections,
        generateLabel: (_, doc) => doc.title as string,
        generateURL: (docs) => {
            return docs.reduce((url, doc) => `${url}/${doc.slug}`, "")
        }
    })
}

export default generateNestedDocs