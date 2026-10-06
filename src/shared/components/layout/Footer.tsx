import React from "react";
import { Heart } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function NpmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.13h13.74v13.74h-3.435v-10.3h-3.435v10.3H5.13z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0-.02-3.24 1.62 1.62 0 0 0 .02 3.24m1.4 9.74v-8.37H5.06v8.37h2.8z" />
    </svg>
  );
}

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#06070a] py-4 text-zinc-400">
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        <div className="flex flex-col items-center justify-between gap-3 text-xs sm:flex-row">
          {/* Left Side: Copyright & License */}
          <div className="text-zinc-500 font-mono text-[11px] text-center sm:text-left">
            © 2026 Flatron. Open-source under MIT License.
          </div>

          {/* Right Side: Creator attribution + Social Icons */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-zinc-400 text-xs">
              <span>Crafted with</span>
              <Heart className="h-3 w-3 fill-red-500 text-red-500 mx-0.5 inline" />
              <span>by</span>
              <span className="font-medium text-zinc-200">Ahmed Ibrahim</span>
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
              <a
                href="https://www.linkedin.com/in/ahmedeprahim/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-md border border-white/8 bg-white/[0.03] text-zinc-400 transition-colors hover:border-white/20 hover:text-[#0a66c2]"
                aria-label="Ahmed Ibrahim LinkedIn Profile"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="h-3 w-3" />
              </a>
              <a
                href="https://github.com/AhmedIbrahim-tech/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-md border border-white/8 bg-white/[0.03] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                aria-label="Flatron GitHub Repository"
                title="GitHub Repository"
              >
                <GithubIcon className="h-3 w-3" />
              </a>
              <a
                href="https://www.npmjs.com/package/flatron"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-md border border-white/8 bg-white/[0.03] text-zinc-400 transition-colors hover:border-white/20 hover:text-[#cb3837]"
                aria-label="Flatron npm Package"
                title="npm Package"
              >
                <NpmIcon className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
