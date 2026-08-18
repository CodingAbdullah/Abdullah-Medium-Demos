import Image from "next/image";
import type { MDXImageType } from "@/utils/types";

// MDXImage custom component
// Utilizes the built-in Next.js Image component as well as the figcaption element
export default function MDXImage(imageProperties: MDXImageType): React.JSX.Element {
    return (
        <figure className='text-center my-6'>
            <div className="relative inline-block p-4 bg-gray-900/30 rounded-lg border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:scale-[1.02]">
                <Image
                    className='mx-auto rounded-md transition-transform duration-300'
                    src={imageProperties.src}
                    height={imageProperties.height}
                    width={imageProperties.width}
                    alt={imageProperties.alt}
                />
            </div>
            <figcaption className="mt-3 mb-4 leading-relaxed text-green-200/90 text-sm font-medium">
                {imageProperties.figcaption}
            </figcaption>
        </figure>
    );
}
