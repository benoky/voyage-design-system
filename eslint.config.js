// ESLint 기본 규칙 가져오기
import js from '@eslint/js';
// 전역 변수 정의 가져오기 (브라우저, 노드 등의 환경에서 사용 가능한 전역 변수)
import globals from 'globals';
// React Hooks 관련 규칙 플러그인 가져오기
import reactHooks from 'eslint-plugin-react-hooks';
// React Fast Refresh 관련 규칙 플러그인 가져오기
import reactRefresh from 'eslint-plugin-react-refresh';
// TypeScript ESLint 설정 가져오기
import tseslint from 'typescript-eslint';
// Prettier 플러그인 가져오기
import prettierPlugin from 'eslint-plugin-prettier';
// React 플러그인 가져오기
import reactPlugin from 'eslint-plugin-react';
// Prettier 설정 가져오기 (ESLint와 충돌하는 규칙 비활성화)
import prettierEslint from 'eslint-config-prettier';

// Prettier 플러그인 설정
const prettierConfig = {
  files: ['**/*.{js,jsx,ts,tsx,css,scss,md}'],
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    // Prettier 규칙을 ESLint 오류로 표시 (Prettier가 우선 적용됨)
    'prettier/prettier': ['error'],
    // Prettier와 충돌할 수 있는 ESLint 규칙 비활성화
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
};

// React 관련 규칙 설정
const reactConfig = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    react: reactPlugin,
  },
  settings: {
    react: {
      version: 'detect', // React 버전 자동 감지
    },
  },
  rules: {
    // React 17 이상에서는 React import가 필요 없음
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    // 추가 React 규칙
    'react/prop-types': 'off', // TypeScript를 사용하므로 prop-types는 필요 없음
    'react/jsx-key': 'error', // 배열 렌더링 시 key 속성 필수
  },
};

export default tseslint.config(
  // 무시할 파일 및 디렉토리 설정
  { ignores: ['dist', 'node_modules', 'build', '**/*.json', '**/*.md', 'public/**'] },
  // Prettier와 충돌하는 모든 ESLint 규칙 비활성화 (먼저 적용)
  prettierEslint,
  // React 설정 적용
  reactConfig,
  // Prettier 설정 적용
  prettierConfig,
  {
    // 기본 권장 설정과 TypeScript 권장 설정 확장
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // TypeScript 및 TSX 파일에만 적용
    files: ['**/*.{ts,tsx}'],
    // 언어 옵션 설정
    languageOptions: {
      // ECMAScript 2022 문법 사용
      ecmaVersion: 2022,
      // 브라우저 환경의 전역 변수 사용 허용
      globals: globals.browser,
      // JSX 지원 활성화
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    // 사용할 플러그인 설정
    plugins: {
      // React Hooks 규칙 플러그인
      'react-hooks': reactHooks,
      // React Fast Refresh 플러그인
      'react-refresh': reactRefresh,
    },
    // 적용할 규칙 설정
    rules: {
      // React Hooks 권장 규칙 적용 (useEffect, useState 등의 올바른 사용 보장)
      ...reactHooks.configs.recommended.rules,
      // React 컴포넌트만 내보내도록 하는 규칙 (Fast Refresh 최적화)
      'react-refresh/only-export-components': [
        'warn', // 경고 수준으로 설정
        { allowConstantExport: true }, // 상수 내보내기 허용
      ],
      '@typescript-eslint/no-explicit-any': 'off', // typescript-eslint 규칙 중 any 타입 비허용 비활성화
      '@typescript-eslint/no-unused-vars': 'off', // typescript-eslint 규칙 중 사용 하지 않는 변수 에러 처리 비활성화
    },
  }
);
