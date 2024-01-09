import React , { ReactNode, Suspense, startTransition, useEffect, useState } from "react";

// 定义 props 类型，
interface LazyComponentProps {
    component: any;
    fallback?: ReactNode;
    props?: any;
}

// 定义懒加载组件
export default function LazyCompoment({
    component: Component,
    fallback = <div>Loading...</div>,
    props
}: LazyComponentProps) {
    const [isReady, setIsReady] = useState(false);
    useEffect(() => {
        startTransition(() => {
            setIsReady(true);
        });
    }, []);
    return (
        <Suspense fallback={fallback || <div>Loading...</div>}>
            {isReady && <Component {...props} />}
        </Suspense>
    );
}
