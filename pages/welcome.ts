import { useGraphqlForms, LocalClient } from "tina-graphql-gateway";
// These are your generated types from CLI
import type * as Tina from "../.tina/__generated__/types";

interface ContentQueryResponse {
  getDocument: Tina.SectionDocumentUnion;
}

interface QueryVars {
  relativePath: string;
  section: string;
}

const query = (gql) => gql`
  query ContentQuery($section: String!, $relativePath: String!) {
    getDocument(section: $section, relativePath: $relativePath) {
      __typename
      ... on Pages_Document {
        data {
          ... on Page_Doc_Data {
            name
          }
        }
      }
    }
  }
`;

export async function getServerSideProps({ params }) {
  const client = new LocalClient();

  export const request = async (
    client,
    variables: { section: string; relativePath: string }
  ) => {
    const queryVars = {
      relativePath: "welcome.md",
      section: "pages",
    };
    const content = await client.requestWithForm(query, {
      variables: queryVars,
    });

    return { props: { content, queryVars } };
  };
}

export default function Page(props: {
  content: ContentQueryResponse;
  queryVars: QueryVars;
}) {
  const [response, isLoading] = useGraphqlForms<ContentQueryResponse>({
    query,
    variables: props.queryVars,
  });

  // initialize with production content & hydrate with development content once loaded
  const docData = isLoading ? props.content.getDocument : response.getDocument;

  return <MyComponent {...docData} />;
}