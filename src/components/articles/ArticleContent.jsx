import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

export const ArticleContent = ({ content }) => {
    return (
        <div className='col-span-3 overflow-hidden relative rounded-xl'>
            <div className=' p-4 text-lg whitespace-pre-line text-justify'>
                <MarkdownRenderer content={content}/>
            </div>           
        </div>
    );
};