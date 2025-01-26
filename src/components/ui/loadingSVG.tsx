const LoadingSVG = () => {
  return (
    <div class="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        overflow="visible"
        fill="#515151"
        stroke="#515151"
      >
        <defs>
          <circle
            id="loader"
            r="4"
            cx="50"
            cy="50"
            transform="translate(0 -30)"
          />
        </defs>
        <use href="#loader" transform="rotate(30 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="0.25s"
            repeatCount="indefinite"
          ></animate>
        </use>
        <use href="#loader" transform="rotate(60 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="0.50s"
            repeatCount="indefinite"
          ></animate>
        </use>
        <use href="#loader" transform="rotate(90 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="0.75s"
            repeatCount="indefinite"
          ></animate>
        </use>
        <use href="#loader" transform="rotate(120 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="1.00s"
            repeatCount="indefinite"
          ></animate>
        </use>
        <use href="#loader" transform="rotate(150 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="1.25s"
            repeatCount="indefinite"
          ></animate>
        </use>
        <use href="#loader" transform="rotate(180 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="1.50s"
            repeatCount="indefinite"
          ></animate>
        </use>
        <use href="#loader" transform="rotate(210 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="1.75s"
            repeatCount="indefinite"
          ></animate>
        </use>
        <use href="#loader" transform="rotate(240 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="2.00s"
            repeatCount="indefinite"
          ></animate>
        </use>
        <use href="#loader" transform="rotate(270 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="2.25s"
            repeatCount="indefinite"
          ></animate>
        </use>
        <use href="#loader" transform="rotate(300 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="2.50s"
            repeatCount="indefinite"
          ></animate>
        </use>
        <use href="#loader" transform="rotate(330 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="2.75s"
            repeatCount="indefinite"
          ></animate>
        </use>
        <use href="#loader" transform="rotate(360 50 50)">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            begin="3.00s"
            repeatCount="indefinite"
          ></animate>
        </use>
      </svg>
    </div>
  )
}

export default LoadingSVG
