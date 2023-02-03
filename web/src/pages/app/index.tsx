import { getAccessToken, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client"
import { GetServerSideProps } from "next";

export default function Home() {

  const { user } = useUser();

  return (
    <div> 
      <h1>Home</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <a href="/api/auth/logout">Logout</a>
    </div>  
  )
};

export const getServerSideProps = withPageAuthRequired();


// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = getSession(req, res);

//   const token = await getAccessToken(req, res);
//   console.log(token);

//   if (!session) {
//     return {
//       redirect: {
//         destination: 'api/auth/login',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {}
//   }
// }