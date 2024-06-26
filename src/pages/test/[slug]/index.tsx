import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { OG_IMAGE } from "../../../../next-seo.config";

export default function TestPage(props: {
  data: { result: string };
  seo: {
    title: string;
    description: string;
    image: { url: string; alt: string };
  };
}) {
  const { data } = props;
  const { seo } = props;

  const [page, setPage] = useState<"body" | "result">("body");

  const [shareTitle, setShareTitle] = useState(seo.title);
  const [result, setResult] = useState(data.result);

  let shareLinkTg = "";
  let shareLinkVk = "";
  let leftIndent = 0;
  let topIndent = 0;

  useEffect(() => {
    if (window !== undefined) {
      const updatedHref = window.location.href.split("?").slice(0, -1).join("");

      window.history.replaceState(null, "", updatedHref);
    }
  }, []);

  useEffect(() => {
    if (window !== undefined) {
      if (page === "result") {
        const randomInt = String(Math.ceil(Math.random() * 3));
        const sanitizedHref = window.location.href
          .split("?")
          .slice(0, -1)
          .join("");
        window.history.replaceState(
          null,
          "",
          sanitizedHref + "?variant=" + randomInt,
        );
        setShareTitle(() => {
          let title = [
            "Я прошел тест 'Какое ты дерево?'",
            "Мой результат - ",
            "Попробуй и ты!",
          ];

          switch (randomInt) {
            case "1":
              title[1] += "Дуб";
              break;
            case "2":
              title[1] += "Берёза";
              break;
            case "3":
              title[1] += "Липа";
              break;
          }
          // check for telegram
          if (2) {
            title[0] = "%0A" + title[0];
            title[1] = "%0A" + title[1];
            title[2] = "%0A" + title[2];
          }
          const result = title.join(" ");

          return result;
        });
        setResult(() => {
          switch (randomInt) {
            case "1":
              return "Дуб";
            case "2":
              return "Берёза";
            case "3":
              return "Липа";
          }
        });
      }
      shareLinkTg = `https://telegram.me/share/url?url=${window.location.href}&text=${shareTitle}`;
      shareLinkVk = `https://vk.com/share.php?url=${window.location.href}&title=${shareTitle}`;
      leftIndent = (window.screen.width - windowW) / 2;
      topIndent = (window.screen.height - windowH) / 2;
    }
  }, [page]);

  useEffect(() => {
    if (window !== undefined) {
      shareLinkTg = `https://telegram.me/share/url?url=${window.location.href}&text=${shareTitle}`;
      shareLinkVk = `https://vk.com/share.php?url=${window.location.href}&title=${shareTitle}`;
    }
  }, [shareTitle]);

  const windowH = 500;
  const windowW = 500;

  const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=${windowW},height=${windowH},left=${leftIndent},top=${topIndent}`;

  const handleOpenShareMenuTg = () => window.open(shareLinkTg, "Тест", params);
  const handleOpenShareMenuVk = () => window.open(shareLinkVk, "Тест", params);

  const pageBody = (
    <div className="flex h-full flex-col items-center justify-center  gap-2">
      <h1 className="font-mono text-2xl">Тест "Какое ты дерево?"</h1>
      <button
        onClick={() => setPage("result")}
        className="color rounded-md bg-emerald-500 p-2 font-mono text-2xl"
      >
        Узнать
      </button>
    </div>
  );

  const pageResult = (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h1 className="font-mono text-2xl">
        Твой результат:
        <span className="font-mono text-3xl font-bold ">{result}</span>
      </h1>
      <button
        onClick={() => setPage("body")}
        className="color rounded-md bg-emerald-500 p-2 font-mono text-2xl"
      >
        Пройти еще раз
      </button>
      <button
        onClick={handleOpenShareMenuTg}
        className="color rounded-md bg-cyan-500 p-2 font-mono text-2xl"
      >
        share TG
      </button>
      <button
        onClick={handleOpenShareMenuVk}
        className="color rounded-md bg-cyan-500 p-2 font-mono text-2xl"
      >
        share VK
      </button>
    </div>
  );

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
        <main className="h-full">
          {page === "body" && pageBody}
          {page === "result" && pageResult}
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const variant = context.query.variant as string;

  const data = { result: "" };

  const seoDescription =
    "[og:description] Наш новый тест по итогам которого вы сможете наконец понять какое вы дерево";
  const seoImage = {
    alt: "",
    url: "",
    width: OG_IMAGE.WIDTH,
    height: OG_IMAGE.HEIGHT,
  };

  let seoTitle = "[og:title] Тест 'Какое ты дерево?'";

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
    default:
      data.result = "";
      seoImage.url = "/default.jpg";
      break;
  }

  return {
    props: {
      data,
      seo: { title: seoTitle, description: seoDescription, image: seoImage },
    },
  };
};
