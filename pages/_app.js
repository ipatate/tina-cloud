import { useCMS, withTina } from "tinacms";
import { Client, TinaCloudProvider } from "tina-graphql-gateway";
// import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const client = useCMS().api.tina;

  return (
    <TinaCloudProvider
      onLogin={(token) => {
        const headers = new Headers();

        //TODO - the token should could as a param from onLogin
        headers.append("Authorization", "Bearer " + token);
        fetch("/api/preview", {
          method: "POST",
          headers: headers,
        }).then(() => {
          window.location.href = "/";
        });
      }}
      onLogout={() => {
        console.log("exit edit mode");
      }}
    >
      <Component {...pageProps} />
    </TinaCloudProvider>
  );
}

export default withTina(MyApp, {
  apis: {
    tina: new Client({
      realm: "zmf-resources",
      clientId: "3d2o2rldla21nos01tq7i9gslc",
    }),
  },
  sidebar: true,
});
