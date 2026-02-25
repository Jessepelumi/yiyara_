import {
  ArrowRightIcon,
  MicrophoneIcon,
  PaperclipIcon,
} from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <section className="flex justify-center items-center w-full">
      <div className="space-y-3">
        <div>
          <header className="flex flex-col text-3xl lg:text-4xl">
            <b className="bg-linear-to-r from-blue-500 via-purple-500 via-40% to-purple-700 bg-clip-text text-transparent w-fit">
              Hi there, User
            </b>
            <b className="bg-linear-to-r from-blue-500 via-purple-500 via-40% to-purple-700 bg-clip-text  text-transparent w-fit">
              Let&apos;s get productive!
            </b>
          </header>

          <section>
            <p className="text-sm text-gray-500">
              I&apos;m here to assist you on your journey to achieveing your
              goals. Use the example prompts below to get started.
            </p>

            {/* <div>
            <div>Example prompts here</div>
            <div>Example prompts here</div>
            <div>Example prompts here</div>
          </div> */}
          </section>
        </div>

        <div className="bg-linear-to-r from-blue-300 via-purple-300 via-50% to-purple-400 rounded-xl p-1">
          <div className="flex flex-col gap-3 p-1.5 rounded-lg bg-white">
            <textarea
              placeholder="Ask whatever you want..."
              className="[field-sizing-content] w-full min-h-10 max-h-12 p-2 text-base outline-none border-none resize-none overflow-y-auto"
            ></textarea>

            <div className="flex justify-between items-center">
              <div className="flex gap-3 px-1">
                <button className="text-gray-500 hover:text-blue-700">
                  <MicrophoneIcon size={20} />
                </button>

                <button className="text-gray-500 hover:text-blue-700">
                  <PaperclipIcon size={20} />
                </button>
              </div>

              <div>
                <button className="p-2 rounded-lg text-blue-600 bg-linear-to-r from-blue-200 via-blue-200 via-20% to-purple-300 hover:text-blue-700">
                  <ArrowRightIcon size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
