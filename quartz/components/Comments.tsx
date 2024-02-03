import { QuartzComponentConstructor } from "./types"

export default (() => {
    function Comments() {
        return (
            <script src="https://giscus.app/client.js"
                    data-repo="JoungDongHee/SecondBrain"
                    data-repo-id="R_kgDOLMlu-g"
                    data-category="General"
                    data-category-id="DIC_kwDOLMlu-s4Cc6ao"
                    data-mapping="pathname"
                    data-strict="0"
                    data-reactions-enabled="1"
                    data-emit-metadata="0"
                    data-input-position="bottom"
                    data-theme="preferred_color_scheme"
                    data-lang="ko"
                    crossOrigin="anonymous"
                    async>
            </script>
        )
    }

    return Comments
}) satisfies QuartzComponentConstructor