'use client';

import { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading2, Heading3, List, ListOrdered, Quote, Code,
  Link as LinkIcon, Image as ImageIcon, AlignLeft, AlignCenter,
  Undo, Redo, Code2, Eye,
} from 'lucide-react';

interface WysiwygEditorProps {
  content: string;
  onChange: (html: string) => void;
}

function ToolbarButton({ onClick, active, disabled, title, children }: {
  onClick: () => void; active?: boolean; disabled?: boolean; title: string; children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active ? 'bg-[#5B65DC] text-white' : 'text-[#8a8fa6] hover:text-[#122056] hover:bg-neutral-100'
      } disabled:opacity-30`}
    >
      {children}
    </button>
  );
}

export function WysiwygEditor({ content, onChange }: WysiwygEditorProps) {
  const [mode, setMode] = useState<'wysiwyg' | 'html'>('wysiwyg');
  const [htmlSource, setHtmlSource] = useState(content);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Image.configure({ inline: false, allowBase64: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Zacznij pisać treść wpisu...' }),
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      setHtmlSource(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-base max-w-none focus:outline-none min-h-[400px] px-4 py-3 prose-headings:font-[family-name:var(--font-funnel)] prose-headings:text-[#122056] prose-p:text-[#4a4f65] prose-a:text-[#5B65DC]',
      },
    },
  });

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = prompt('URL linku:');
    if (!url) return;
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = prompt('URL obrazka (lub wklej ścieżkę z uploadu):');
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const switchToHtml = () => {
    if (editor) setHtmlSource(editor.getHTML());
    setMode('html');
  };

  const switchToWysiwyg = () => {
    if (editor) {
      editor.commands.setContent(htmlSource);
      onChange(htmlSource);
    }
    setMode('wysiwyg');
  };

  if (!editor) return null;

  const s = 15;

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center flex-wrap gap-0.5 px-2 py-1.5 bg-neutral-50 border-b border-neutral-200">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Pogrubienie">
          <Bold size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Kursywa">
          <Italic size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Podkreślenie">
          <UnderlineIcon size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Przekreślenie">
          <Strikethrough size={s} />
        </ToolbarButton>

        <div className="w-px h-5 bg-neutral-200 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Nagłówek H2">
          <Heading2 size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Nagłówek H3">
          <Heading3 size={s} />
        </ToolbarButton>

        <div className="w-px h-5 bg-neutral-200 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Lista punktowana">
          <List size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Lista numerowana">
          <ListOrdered size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Cytat">
          <Quote size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Blok kodu">
          <Code size={s} />
        </ToolbarButton>

        <div className="w-px h-5 bg-neutral-200 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Wyrównaj do lewej">
          <AlignLeft size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Wyśrodkuj">
          <AlignCenter size={s} />
        </ToolbarButton>

        <div className="w-px h-5 bg-neutral-200 mx-1" />

        <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Dodaj link">
          <LinkIcon size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Dodaj obrazek">
          <ImageIcon size={s} />
        </ToolbarButton>

        <div className="w-px h-5 bg-neutral-200 mx-1" />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Cofnij">
          <Undo size={s} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Ponów">
          <Redo size={s} />
        </ToolbarButton>

        {/* Mode toggle — right side */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={mode === 'wysiwyg' ? switchToHtml : switchToWysiwyg}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              mode === 'html'
                ? 'bg-[#122056] text-white'
                : 'text-[#8a8fa6] hover:text-[#122056] hover:bg-neutral-100'
            }`}
            title={mode === 'wysiwyg' ? 'Przełącz na HTML' : 'Przełącz na edytor wizualny'}
          >
            {mode === 'wysiwyg' ? <Code2 size={13} /> : <Eye size={13} />}
            {mode === 'wysiwyg' ? 'HTML' : 'Edytor'}
          </button>
        </div>
      </div>

      {/* Editor / HTML source */}
      {mode === 'wysiwyg' ? (
        <EditorContent editor={editor} />
      ) : (
        <textarea
          value={htmlSource}
          onChange={(e) => {
            setHtmlSource(e.target.value);
            onChange(e.target.value);
          }}
          className="w-full px-4 py-3 font-mono text-xs text-[#4a4f65] focus:outline-none min-h-[400px] resize-y"
          spellCheck={false}
        />
      )}
    </div>
  );
}
