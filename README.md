# Voyage Design System

Voyage 프로젝트를 위한 React 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install voyage-design-system
```

## 사용법

```jsx
import { Button, Card, Input } from 'voyage-design-system';
import 'voyage-design-system/dist/voyage-design-system.css';

function App() {
  return (
    <div>
      <Button variant="primary">버튼</Button>
      <Input placeholder="입력해주세요" />
      <Card>
        <Card.Header>카드 제목</Card.Header>
        <Card.Content>카드 내용</Card.Content>
      </Card>
    </div>
  );
}
```

## 개발

```bash
# 로컬에서 Storybook 실행
npm run local-sb-start

# 빌드
npm run publish-build
```

## 라이선스

MIT 