import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default NotePreview;
///////

/// Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)
// const parsedId: number  import { fetchNoteById } from "@/lib/api";
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from "@tanstack/react-query";
// import NoteDetailsClient from "./NotePreview.client";

// type Props = {
//   params: Promise<{ id: string }>;
// };

// const NotePreview = async ({ params }: Props) => {
//   const { id } = await params;
//   const parsedId = Number(id);

//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["note", parsedId],
//     queryFn: () => fetchNoteById(parsedId),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NoteDetailsClient id={parsedId} />
//     </HydrationBoundary>
//   );
// };

// export default NotePreview; чи потрібна мені зміна const parsedId = Number(id); чи можна замість parsedId вписувати просто id
