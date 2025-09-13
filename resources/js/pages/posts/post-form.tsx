import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { BackpackIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts'
    }
];


export default function PostForm({ ...props }: {}) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />
            <div className="flex h¬œq-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                {/* Back to Products Button */}
                <Link as="button"
                      href={route('posts.index')}
                      className="flex items-center w-fit rounded-lg text-center text-md cursor-pointer bg-indigo-800 px-4 py-2 text-white hover:opacity-90">
                    Back to Posts
                    <BackpackIcon size={20} />
                </Link>


                <Card>
                    <CardHeader>
                        <CardTitle>{breadcrumbs[0].title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-4" autoComplete="off">
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
