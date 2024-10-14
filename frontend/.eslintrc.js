module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended", // Prettier 규칙을 ESLint에 통합
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "prettier/prettier": "error", // Prettier 포맷 위반 시 에러로 표시
    "no-unused-vars": "off", // 사용하지 않는 변수 경고 끄기
    "react/prop-types": "off", // PropTypes 검사 끄기
    "react/no-unknown-property": "off", // 알려지지 않은 속성 검사 끄기
    "react/react-in-jsx-scope": "off",
    "react/jsx-key": "error", // JSX key 규칙 활성화
  },
};
