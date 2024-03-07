import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TestResultPage(props: {
  data: { result: string };
  seo: {
    title: string;
    description: string;
    image: { url: string; alt: string };
  };
}) {
  let leftIndent = 0;
  let topIndent = 0;

  const [href, setHref] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      window.history.replaceState(
        null,
        "",
        window.location.href + "&done=true",
      );
      leftIndent = (window.screen.width - windowW) / 2;
      topIndent = (window.screen.height - windowH) / 2;
      setHref(window.location.href + "&done=true");
    }
  }, []);

  const { data } = props;
  const { seo } = props;

  const router = useRouter();

  const currPath = router.asPath;
  const destination = currPath.split("/").slice(0, -1).join("/");

  const shareLink = `https://telegram.me/share/url?url=${href}&text=Я прошел тест 'Какое ты дерево?' и мой результат - ${data.result}`;

  const windowH = 500;
  const windowW = 500;

  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${windowW},height=${windowH},left=${leftIndent},top=${topIndent}`;

  const handleOpenShareMenu = () => window.open(shareLink, "Тест", params);

  return (
    <>
      <NextSeo
        openGraph={{
          title: seo.title,
          description: seo.description,
          images: [seo.image],
        }}
      />
      <div className="h-screen">
        <main className="flex h-full flex-col items-center justify-center gap-2">
          <h1 className="font-mono text-2xl">
            Твой результат:
            <span className="font-mono text-3xl font-bold ">{data.result}</span>
          </h1>
          <button
            onClick={() => router.push(destination)}
            className="color rounded-md bg-emerald-500 p-2 font-mono text-2xl"
          >
            Пройти еще раз
          </button>
          <button
            onClick={handleOpenShareMenu}
            className="color rounded-md bg-cyan-500 p-2 font-mono text-2xl"
          >
            share
          </button>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const variant = context.query.variant as string;
  const done = context.query.done as string;
  const testName = context.query.slug as string;
  const data = { result: "" };
  const seoTitle =
    "Я прошел тест 'Какое ты дерево?' и мой результат - " + data.result;
  const seoDescription = "Тест про деревья";
  const seoImage = { alt: "", url: "" };

  switch (variant) {
    case "1":
      data.result = "Дуб";
      seoImage.url = "/d.jpg";
      break;
    case "2":
      data.result = "Берёза";
      seoImage.url = "/b.jpg";
      break;
    case "3":
      data.result = "Липа";
      seoImage.url = "/l.jpg";
      break;
  }

  if (Boolean(done)) {
    return {
      redirect: {
        destination: "/test/" + testName,
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        data,
        seo: { title: seoTitle, description: seoDescription, image: seoImage },
      },
    };
  }
};
