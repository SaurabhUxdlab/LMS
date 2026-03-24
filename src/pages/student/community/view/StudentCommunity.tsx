import { useMemo, useState } from "react";
import {
  Eye,
  Flame,
  Heart,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Search,
  Send,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
    badge: "Student" | "Instructor" | "Moderator";
  };
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  timestamp: string;
  isLiked?: boolean;
}

interface Topic {
  name: string;
  count: number;
  isTrending?: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: { name: "Sarah Chen", badge: "Student" },
    title: "How to handle state management in large React applications?",
    content:
      "I've been working on a large React project and finding it difficult to manage state across multiple components. Should I use Redux, Context API, or something else? Looking for advice from developers with experience in scaling React apps.",
    tags: ["React", "State Management", "Frontend"],
    likes: 24,
    comments: 12,
    views: 156,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    author: { name: "Alex Rivera", badge: "Student" },
    title: "Best practices for REST API design",
    content:
      "I'm building a backend API and wanted to know what everyone considers the best practices for REST API design. Things like naming conventions, error handling, versioning, and consistency patterns.",
    tags: ["API", "Backend", "Best Practices"],
    likes: 18,
    comments: 8,
    views: 98,
    timestamp: "4 hours ago",
  },
  {
    id: "3",
    author: { name: "Dr. Emily Watson", badge: "Instructor" },
    title: "Welcome to our new community! Here are some guidelines",
    content:
      "Hello everyone! I'm excited to see this community grow. Let's keep our discussions focused on learning and helping each other. Ask questions, share insights, and support fellow learners.",
    tags: ["Announcement", "Community"],
    likes: 45,
    comments: 20,
    views: 320,
    timestamp: "1 day ago",
  },
  {
    id: "4",
    author: { name: "James Miller", badge: "Student" },
    title: "Tips for preparing for technical interviews?",
    content:
      "I have an upcoming interview with a tech company and wanted to know what resources and strategies helped others here. Any recommendations for coding practice, behavioral prep, and system design?",
    tags: ["Career", "Interview", "Tips"],
    likes: 32,
    comments: 18,
    views: 245,
    timestamp: "1 day ago",
  },
  {
    id: "5",
    author: { name: "Maria Garcia", badge: "Student" },
    title: "Understanding Python async/await - A beginner's guide",
    content:
      "I recently learned about async/await in Python and wanted to share a simple breakdown of how asynchronous programming works. Posting my notes in case they help someone else too.",
    tags: ["Python", "Async", "Tutorial"],
    likes: 56,
    comments: 14,
    views: 189,
    timestamp: "2 days ago",
  },
];

const trendingTopics: Topic[] = [
  { name: "React", count: 234, isTrending: true },
  { name: "JavaScript", count: 189 },
  { name: "Python", count: 156 },
  { name: "Data Science", count: 134, isTrending: true },
  { name: "UI/UX", count: 98 },
  { name: "Career", count: 87, isTrending: true },
  { name: "API", count: 76 },
  { name: "Machine Learning", count: 65 },
];

const suggestedDiscussions = [
  { title: "Getting started with TypeScript", replies: 23 },
  { title: "React Hooks explained", replies: 18 },
  { title: "Building your first web app", replies: 15 },
  { title: "Database design tips", replies: 12 },
];

const activeContributors = [
  { name: "Sarah Chen", posts: 12 },
  { name: "Alex Rivera", posts: 8 },
  { name: "Maria Garcia", posts: 6 },
  { name: "James Miller", posts: 5 },
];

type FilterTab = "all" | "my-posts" | "questions" | "discussions";

const filterTabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "my-posts", label: "My Posts" },
  { id: "questions", label: "Questions" },
  { id: "discussions", label: "Discussions" },
];

const getBadgeColor = (badge: Post["author"]["badge"]) => {
  switch (badge) {
    case "Instructor":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Moderator":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
};

export default function StudentCommunity() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );
  };

  const handlePostSubmit = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: { name: "You", badge: "Student" },
      title: newPostTitle,
      content: newPostContent,
      tags: [],
      likes: 0,
      comments: 0,
      views: 0,
      timestamp: "Just now",
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      switch (activeTab) {
        case "questions":
          return (
            post.title.toLowerCase().includes("how") || post.title.toLowerCase().includes("?")
          );
        case "discussions":
          return !post.title.toLowerCase().includes("how");
        default:
          return true;
      }
    });
  }, [posts, searchTerm, activeTab]);

  const totalEngagement = useMemo(
    () => posts.reduce((sum, post) => sum + post.likes + post.comments, 0),
    [posts]
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="app-page-shell">
        <div className="space-y-6">
          <header className="space-y-3">
            <div className="app-page-heading">
              <MessageCircle className="app-page-title-icon" />
              <h1 className="app-page-title">Community</h1>
            </div>
            <p className="max-w-2xl text-base text-slate-600 dark:text-zinc-300">
              Ask questions, share ideas, and learn alongside other students and instructors
              in one focused learning space.
            </p>
          </header>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
            <main className="space-y-6">
              <Card className="gap-0 rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <CardContent className="space-y-5 p-5 md:p-6">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                        Start a Discussion
                      </h2>
                      <p className="text-sm text-slate-600 dark:text-zinc-400">
                        Ask for help, share a resource, or start a focused learning conversation.
                      </p>
                    </div>

                    <div className="flex w-full flex-col gap-3 lg:flex-row xl:max-w-[540px]">
                      <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search discussions, tags, or topics"
                          className="h-11 rounded-2xl border-slate-200 bg-white pl-11 shadow-none dark:border-zinc-700 dark:bg-zinc-950"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {filterTabs.map((tab) => (
                          <Button
                            key={tab.id}
                            variant={activeTab === tab.id ? "default" : "outline"}
                            onClick={() => setActiveTab(tab.id)}
                            className="rounded-full px-4"
                          >
                            {tab.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-slate-200 bg-slate-50/80 p-4 dark:border-zinc-700 dark:bg-zinc-800/40 md:p-5">
                    <div className="flex flex-col gap-4 md:flex-row">
                      <Avatar className="h-12 w-12 border border-slate-200 dark:border-zinc-700">
                        <AvatarImage src="/src/assets/react.svg" />
                        <AvatarFallback>Y</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <Input
                          placeholder="What would you like to ask or share?"
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                          className="h-11 rounded-2xl border-slate-200 bg-white font-medium shadow-none dark:border-zinc-700 dark:bg-zinc-950"
                        />
                        <textarea
                          placeholder="Add details, context, or your learning challenge to help others respond better..."
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          className="min-h-[120px] w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 shadow-none outline-none transition-colors focus:border-primary dark:border-zinc-700 dark:bg-zinc-950"
                        />

                        <div className="flex justify-end">
                          <Button
                            onClick={handlePostSubmit}
                            disabled={!newPostTitle.trim() || !newPostContent.trim()}
                            className="h-11 rounded-2xl px-5 font-semibold"
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Publish Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <section className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Latest Discussions
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-zinc-400">
                      {filteredPosts.length} conversations matched your current view.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="gap-0 rounded-3xl border border-slate-200 py-0 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
                    >
                      <CardContent className="space-y-4 p-5 md:p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-11 w-11 border border-slate-200 dark:border-zinc-700">
                              <AvatarFallback className="bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-200">
                                {post.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium text-slate-900 dark:text-white">
                                  {post.author.name}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`rounded-full text-xs ${getBadgeColor(post.author.badge)}`}
                                >
                                  {post.author.badge}
                                </Badge>
                              </div>
                              <span className="text-xs text-slate-500 dark:text-zinc-400">
                                {post.timestamp}
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold leading-snug text-slate-900 transition-colors hover:text-primary dark:text-white">
                            {post.title}
                          </h3>
                          <p className="text-sm leading-6 text-slate-600 dark:text-zinc-400">
                            {post.content}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="rounded-full px-3 py-1">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-6 border-t border-slate-200 pt-4 text-sm dark:border-zinc-700">
                          <button
                            className={`inline-flex items-center gap-2 transition-colors ${
                              post.isLiked
                                ? "text-rose-500"
                                : "text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                            }`}
                            onClick={() => handleLike(post.id)}
                          >
                            <Heart
                              className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`}
                            />
                            {post.likes}
                          </button>
                          <div className="inline-flex items-center gap-2 text-slate-600 dark:text-zinc-400">
                            <MessageSquare className="h-4 w-4" />
                            {post.comments}
                          </div>
                          <div className="inline-flex items-center gap-2 text-slate-600 dark:text-zinc-400">
                            <Eye className="h-4 w-4" />
                            {post.views}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <Card className="gap-0 rounded-3xl border border-dashed border-slate-300 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                    <CardContent className="space-y-5 p-10 text-center">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10">
                        <MessageCircle className="h-10 w-10 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                          No discussions found
                        </h3>
                        <p className="text-base text-slate-600 dark:text-zinc-400">
                          Try adjusting your search or switch to a different tab.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </section>
            </main>

            <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
              <Card className="gap-0 rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <CardContent className="space-y-4 p-5">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/40">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400">
                      Community Pulse
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                      {totalEngagement}
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                      Total likes and replies across current posts
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Trending Topics
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topic) => (
                      <Badge
                        key={topic.name}
                        variant="outline"
                        className={`rounded-full px-3 py-1 ${
                          topic.isTrending ? "border-primary/30 bg-primary/5" : ""
                        }`}
                      >
                        {topic.isTrending && <TrendingUp className="mr-1 h-3 w-3" />}
                        {topic.name} ({topic.count})
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="gap-0 rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Suggested Discussions
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {suggestedDiscussions.map((discussion) => (
                      <div
                        key={discussion.title}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:border-zinc-700 dark:bg-zinc-800/40 dark:hover:bg-zinc-800"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {discussion.title}
                            </p>
                            <p className="mt-1 text-sm text-slate-600 dark:text-zinc-400">
                              Suggested for your learning interests
                            </p>
                          </div>
                          <Badge className="rounded-full bg-slate-900 px-2.5 py-1 text-white hover:bg-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-white">
                            {discussion.replies}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="gap-0 rounded-3xl border border-slate-200 py-0 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Top Contributors
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {activeContributors.map((contributor) => (
                      <div
                        key={contributor.name}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/40"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-200">
                            {contributor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-slate-900 dark:text-white">
                            {contributor.name}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-zinc-400">
                            {contributor.posts} posts
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
