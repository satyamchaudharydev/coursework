import { Coursework } from "@/store/useCourseWorkStore";
import PDFPreview from "./PdfPreview";
import Link from "next/link";


export default function Card({ coursework }: { coursework: Coursework }) {
  const tags = [
    {
      icon: "https://s3-alpha-sig.figma.com/img/5149/d4b1/c5f25e04c1e3f9c54c84aed74763a44f?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ur1-sB9UZ1Kc~fdOP9QCFbrmaR56b7RjQ6uufvzPKyftT7Uo2td7rmr4G5BZY8Srcpa8E0HQlEx5EOBFXA10wS-vOykj9oGQHA-Vsw~twsyXLRyq6XWPo1AmqoLAsQ7UxoyEP4EC343MH-qUJb5kyljUmtgDfrQu5Jvjc8WX3y0ztGFQ5ejvhklo9vz8ePsKazGwwhAjagAE4aYXzDHiP1gFOQv~Fnus1AzSfON0z~LggFwhytBD4O92vD-3-bi2eJXEC4UJvRic8SJp8ofDRJCThsgET-VutCJM1Dql5d6qEsTPdKa3RBiJnDhfDlxqaNijpyDAGx6lfcXq6G1OfA__",
      label: coursework.topic
    },
    {
      icon: "https://s3-alpha-sig.figma.com/img/0701/25d4/1d42620865ef54f3593de989f11a0a54?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bVZZIUQW-oip8Tj6Nk5zer-0fTpEum8eGuYjj14nbdzT~KUwAkfij6EDcTrLlLufbT5jwb9elGxIxMcENJgXMJzQsacCcpQQ2lv9Wyav0Ui3CYFxvpppKSiuxTowizpI4UzpgCt4abLL8bO~gLqS-Cw9SoYw9UsTHEhYSIkjMD~FdTYvG5HQtY16Nv8-aJULHbZwTG0PYcj7M6af-dFoqtmbV4fHO1N8mLLcBgO7b-kSRjPzaYhl8vpaoaFOHOvmAbwnpG0SFD5qKK4PT-bNAs63E8R~fqRusCB0CXJ2srzR3Etq0KZiiY24pSLMCvQ0tduIzCWp73C7B3i1jL4-bA__",
      label: coursework.totalTimeReading + " min read",
    },
    {
      icon: "https://s3-alpha-sig.figma.com/img/e630/ee8f/d17d9bebb8a16d05f3cc4f644e227e0c?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jt1C3b3eiuvMaD79m5~0dza1yzu-wC~PIm9b~DsVZiG0NHREhp-WPvgHfaF5qimYJLdp5NKN9ID00Bhl-dGNfDcKxL5ovfhjYGlKWpFjsF7P9pEacOIyaZVgDHp3fnrDaQKB6aPn58Yprx0L5saKfXSISz2DYIbaJdJgLEzItDOp97-4HN~X-JmZO4f187BREhTOtwBNiG6T~Cy-ta5vengHu9vtWFK7leqzP33y6CfL8YBJxa1SxzeR8wgx-MaEXXlPI-xNV~dpGLcygDvYL0hfuaRQKsLHytD0ipapspRCyCDn0SnNV4rYUEcVG5qRHkBIFSabXP8qIDJublRD0w__",
      label: coursework.totalWords + " words",
    },
    {
      icon: "https://s3-alpha-sig.figma.com/img/9f1c/4a37/d3249a433f9454ce2301c149aa5132db?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BFdpogYa05e9nkOtfDisma4xEtaMxS1SSwK~Qv8HdoK-br4mHipo78HwHhDlb4QaDRm0f0pu5d~lN45JS5gPDu25VsROsWeiheI3RFzhKJ0O9sVKZR8Nc5pgutCeQwHV0qAWnOTSZGhBNbkUhMQ3Agt7PF848DJGycFegQl4mZhV6UA91GeI-U5H-mMZ910i3gw2p2aGFn9AQJf97tIas0RR8uUIzXky9864n3xDjfRXa~PrUbfnUdWVSMekwmwJd0dFtZ8aDh~FMKPScGsgmO4rs2KvmsdSF8ReE7PvfbLwQH4KYZL3dU7NnmgOVVptrygZLjeYYQt0uTEweo~fWw__",
      label: coursework.evaluation.totalScore + coursework.evaluation.maxScore,
    },
    {
      icon: "https://s3-alpha-sig.figma.com/img/b5f1/da8a/f8dd857784bd235778ba863a1ca55710?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eIebXf8kReh9gnheqkClVvlTINNNq-kuXUSAytUD7Hfb8adZ7iFUn0MHQ2fyqvQP0imKaCvyd7rJKgjnh7AFrv0wYkweU0gSUTfBYAql4KajHX8P1p56NaVH4SooiPFcqiky7aoHZZ7sbYfaZvUks-L2FgxoRMpuSsvjtCTWUd2tM-60Ci6fsQawkJ5FTsuk5bnl026meDH9zJ017EGFJkQTH7~BugjEMv-yK8v8pSDpc9pqOyx4v2F-TCKVS7bsJP88xVB68A3S1otv9iiPvcHsp26rnJrkAPNPTO94LhEQyhoIfCDEdvWkxwCMRo-6m5hskayBMhg9qkmQGxADQA__",
      label: coursework.language,
    },
  ];
  return (
    <Link
      href={`/coursework/${coursework.id}`}
      className="flex gap-4 w-full p-2 rounded-[12px] flex-1"
      style={{
        background:
          "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(233, 216, 244, 0.32) 100%), rgba(255, 255, 255, 0.64)",
      }}
    >
      <div className="hidden lg:block h-[160px] w-[120px] bg-white rounded-[8px] border border-[#EAF0F2]">
        {coursework.file && (
          <PDFPreview fileUrl={coursework.file} width={100} height={150} />
        )}
      </div>
      <div className="flex flex-1 flex-col items-start gap-1.5">
        <h3 className="line-clamp-2 self-stretch overflow-hidden text-ellipsis text-[18px] font-extrabold capitalize leading-[normal] text-neutrals-800">
          {coursework.title}
        </h3>
        <p className="font-base line-clamp-2 overflow-hidden text-ellipsis text-[14px]">
          How Does the temperature cool for Does the temperature cool for Does
          the temperature cool for
        </p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <div
              key={tag.label}
              className="text-xs bg-white text-gray-400 rounded-full px-2 py-1 font-[700] "
            >
              <img
                src={tag.icon}
                alt="icon"
                className="w-4 h-4 mr-1 inline"
              />
              {tag.label}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
