import { BlogEditor } from "@/src/components/admin/blog-editor";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#122056]">Nowy wpis</h1>
        <p className="text-sm text-[#8a8fa6] mt-1">Utwórz nowy wpis na blogu</p>
      </div>
      <BlogEditor />
    </div>
  );
}
