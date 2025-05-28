import React from 'react'
const Loading = () => {
  return (
    <div className="text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="3em"
        height="3em"
        viewBox="0 0 24 24"
      >
        <circle cx="4" cy="12" r="3" fill="#47a6ff">
          <animate
            id="svgSpinners3DotsBounce0"
            attributeName="cy"
            begin="0;svgSpinners3DotsBounce1.end+0.2s"
            calcMode="spline"
            dur="0.48s"
            keySplines=".33,.66,.66,1;.33,0,.66,.33"
            values="12;6;12"
          />
        </circle>
        <circle cx="12" cy="12" r="3" fill="#47a6ff">
          <animate
            attributeName="cy"
            begin="svgSpinners3DotsBounce0.begin+0.08s"
            calcMode="spline"
            dur="0.48s"
            keySplines=".33,.66,.66,1;.33,0,.66,.33"
            values="12;6;12"
          />
        </circle>
        <circle cx="20" cy="12" r="3" fill="#47a6ff">
          <animate
            id="svgSpinners3DotsBounce1"
            attributeName="cy"
            begin="svgSpinners3DotsBounce0.begin+0.16s"
            calcMode="spline"
            dur="0.48s"
            keySplines=".33,.66,.66,1;.33,0,.66,.33"
            values="12;6;12"
          />
        </circle>
      </svg>
    </div>
  )
}

export default Loading
