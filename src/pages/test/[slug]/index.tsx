import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TestPage() {
  const router = useRouter();

  const path = router.asPath;

  return (
    <div className="h-screen">
      <main className="flex h-full flex-col items-center justify-center  gap-2">
        <h1 className="font-mono text-2xl">Тест "Какое ты дерево?"</h1>
        <button
          onClick={() =>
            router.push(
              path + "/result?variant=" + Math.ceil(Math.random() * 3),
            )
          }
          className="color rounded-md bg-emerald-500 p-2 font-mono text-2xl"
        >
          Узнать
        </button>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  return { props: {} };
};
