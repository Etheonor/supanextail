// import Head from 'next/head';
// import Layout from 'components/Layout';
// import { createClient } from '@supabase/supabase-js';
// import { useState } from 'react';

// const AdminPage = () => {
//   const [currentTable, setCurrentTable] = useState('admin_list');

//   return (
//     <div>
//       <Head>
//         <title>{process.env.NEXT_PUBLIC_TITLE} | Dashboard</title>
//       </Head>

//       <Layout>
//         <>
//           <h1 className="text-4xl font-bold md:text-5xl font-title">
//             Admin Dashboard
//           </h1>
//           <p>Hello admin ! Select your table to display the content</p>
//           <div className="flex space-x-3">
//             <button
//               type="button"
//               className="btn btn-primary btn-sm"
//               onClick={() => {
//                 setCurrentTable('profiles');
//               }}
//             >
//               User profiles
//             </button>
//             <button
//               type="button"
//               className="btn btn-primary btn-sm"
//               onClick={() => {
//                 setCurrentTable('admin_list');
//               }}
//             >
//               Admin List
//             </button>
//             <button
//               type="button"
//               className="btn btn-primary btn-sm"
//               onClick={() => {
//                 setCurrentTable('subscriptions');
//               }}
//             >
//               Subscriptions
//             </button>
//           </div>
//         </>
//       </Layout>
//     </div>
//   );
// };
// export async function getServerSideProps({ req }) {
//   const supabaseAdmin = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.SUPABASE_ADMIN_KEY
//   );
//   const { user } = await supabaseAdmin.auth.api.getUserByCookie(req);

//   // If the user exist, you will retrieve the user profile and if he/she's an admin
//   if (user) {
//     const { data: admincheck, error } = await supabaseAdmin
//       .from('admin_list')
//       .select('isadmin')
//       .eq('id', user.id)
//       .single();

//     if (admincheck.isadmin) {
//       return {
//         props: {
//           admincheck: admincheck.isadmin,
//           adminKey: process.env.SUPABASE_ADMIN_KEY,
//         },
//       };
//     }

//     if (error) {
//       console.log(error);
//     }
//     return { props: {}, redirect: { destination: '/', permanent: false } };
//   }
//   // If no user, redirect to index.
//   return { props: {}, redirect: { destination: '/', permanent: false } };
// }
// export default AdminPage;
