import { useState } from 'react'
import {
  Search,
  MessageCircle,
  Heart,
  Eye,
  TrendingUp,
  Users,
  Send,
  MoreHorizontal,
  MessageSquare
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Types
interface Post {
  id: string
  author: {
    name: string
    avatar?: string
    badge: 'Student' | 'Instructor' | 'Moderator'
  }
  title: string
  content: string
  tags: string[]
  likes: number
  comments: number
  views: number
  timestamp: string
  isLiked?: boolean
}

interface Topic {
  name: string
  count: number
  isTrending?: boolean
}

// Mock data
const mockPosts: Post[] = [
  {
    id: '1',
    author: { name: 'Sarah Chen', badge: 'Student' },
    title: 'How to handle state management in large React applications?',
    content: 'I\'ve been working on a large React project and finding it difficult to manage state across multiple components. Should I use Redux, Context API, or something else? Looking for advice from developers with experience in scaling React apps.',
    tags: ['React', 'State Management', 'Frontend'],
    likes: 24,
    comments: 12,
    views: 156,
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    author: { name: 'Alex Rivera', badge: 'Student' },
    title: 'Best practices for REST API design',
    content: 'I\'m building a backend API and wanted to know what everyone considers the best practices for REST API design. Things like naming conventions, error handling, versioning, etc.',
    tags: ['API', 'Backend', 'Best Practices'],
    likes: 18,
    comments: 8,
    views: 98,
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    author: { name: 'Dr. Emily Watson', badge: 'Instructor' },
    title: 'Welcome to our new community! Here are some guidelines',
    content: 'Hello everyone! I\'m excited to see this community grow. Let\'s keep our discussions focused on learning and helping each other. Feel free to ask questions and share your knowledge with fellow learners.',
    tags: ['Announcement', 'Community'],
    likes: 45,
    comments: 20,
    views: 320,
    timestamp: '1 day ago'
  },
  {
    id: '4',
    author: { name: 'James Miller', badge: 'Student' },
    title: 'Tips for preparing for technical interviews?',
    content: 'I have an upcoming interview with a tech company and wanted to know what resources and strategies helped others in this community. Any recommendations for coding practice and system design questions?',
    tags: ['Career', 'Interview', 'Tips'],
    likes: 32,
    comments: 18,
    views: 245,
    timestamp: '1 day ago'
  },
  {
    id: '5',
    author: { name: 'Maria Garcia', badge: 'Student' },
    title: 'Understanding Python async/await - A beginner\'s guide',
    content: 'I recently learned about async/await in Python and wanted to share my understanding with the community. Here\'s a simple breakdown of how asynchronous programming works in Python.',
    tags: ['Python', 'Async', 'Tutorial'],
    likes: 56,
    comments: 14,
    views: 189,
    timestamp: '2 days ago'
  }
]

const trendingTopics: Topic[] = [
  { name: 'React', count: 234, isTrending: true },
  { name: 'JavaScript', count: 189 },
  { name: 'Python', count: 156 },
  { name: 'Data Science', count: 134, isTrending: true },
  { name: 'UI/UX', count: 98 },
  { name: 'Career', count: 87, isTrending: true },
  { name: 'API', count: 76 },
  { name: 'Machine Learning', count: 65 }
]

const suggestedDiscussions = [
  { title: 'Getting started with TypeScript', replies: 23 },
  { title: 'React Hooks explained', replies: 18 },
  { title: 'Building your first web app', replies: 15 },
  { title: 'Database design tips', replies: 12 }
]

const activeContributors = [
  { name: 'Sarah Chen', posts: 12 },
  { name: 'Alex Rivera', posts: 8 },
  { name: 'Maria Garcia', posts: 6 },
  { name: 'James Miller', posts: 5 }
]

// Filter tabs
type FilterTab = 'all' | 'my-posts' | 'questions' | 'discussions'
const filterTabs: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'my-posts', label: 'My Posts' },
  { id: 'questions', label: 'Questions' },
  { id: 'discussions', label: 'Discussions' }
]

// Badge color helper
const getBadgeColor = (badge: Post['author']['badge']) => {
  switch (badge) {
    case 'Instructor': return 'bg-blue-500/10 text-blue-600 border-blue-200'
    case 'Moderator': return 'bg-purple-500/10 text-purple-600 border-purple-200'
    default: return 'bg-green-500/10 text-green-600 border-green-200'
  }
}

export default function StudentCommunity() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const availableTags = ['React', 'JavaScript', 'Python', 'TypeScript', 'UI/UX', 'Backend', 'Career', 'Tutorial']

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        }
      }
      return post
    }))
  }

  const handlePostSubmit = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return

    const newPost: Post = {
      id: Date.now().toString(),
      author: { name: 'You', badge: 'Student' },
      title: newPostTitle,
      content: newPostContent,
      tags: selectedTag ? [selectedTag] : [],
      likes: 0,
      comments: 0,
      views: 0,
      timestamp: 'Just now'
    }

    setPosts([newPost, ...posts])
    setNewPostTitle('')
    setNewPostContent('')
    setSelectedTag(null)
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())

    if (!matchesSearch) return false

    switch (activeTab) {
      case 'questions':
        return post.title.toLowerCase().includes('how') ||
          post.title.toLowerCase().includes('?')
      case 'discussions':
        return !post.title.toLowerCase().includes('how')
      default:
        return true
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto pl-1 py-4">

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Community
              </h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Ask questions, share ideas, and learn together
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {filterTabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-4 ${activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main Content - Left Column */}
          <main className="flex-1 min-w-0">

            {/* Create Post Card */}
            <Card className="mb-6 border-border/50 shadow-sm">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/src/assets/react.svg" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="Ask a question or share something..."
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="font-medium"
                    />
                    <textarea
                      placeholder="Describe your question or idea..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="w-full min-h-[80px] p-3 rounded-lg border bg-muted/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        {availableTags.slice(0, 4).map(tag => (
                          <Badge
                            key={tag}
                            variant={selectedTag === tag ? 'default' : 'outline'}
                            className={`cursor-pointer text-xs ${selectedTag === tag
                              ? 'bg-primary'
                              : 'hover:bg-muted'
                              }`}
                            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        size="sm"
                        onClick={handlePostSubmit}
                        disabled={!newPostTitle.trim() || !newPostContent.trim()}
                        className="gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Post List */}
            <div className="space-y-4">
              {filteredPosts.map(post => (
                <Card
                  key={post.id}
                  className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-5">
                    {/* Author Info */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-muted">
                            {post.author.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{post.author.name}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${getBadgeColor(post.author.badge)}`}
                            >
                              {post.author.badge}
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {post.content}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Interactions */}
                    <div className="flex items-center gap-6 pt-3 border-t">
                      <button
                        className={`flex items-center gap-1.5 text-sm transition-colors ${post.isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-foreground'
                          }`}
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No discussions found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </CardContent>
              </Card>
            )}
          </main>

          {/* Sidebar - Right Column */}
          <aside className="lg:w-80 space-y-6">

            {/* Trending Topics */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map(topic => (
                    <Badge
                      key={topic.name}
                      variant="outline"
                      className={`cursor-pointer hover:bg-muted transition-colors ${topic.isTrending ? 'bg-primary/5 border-primary/30' : ''
                        }`}
                    >
                      {topic.isTrending && <TrendingUp className="h-3 w-3 mr-1" />}
                      {topic.name}
                      <span className="ml-1 text-muted-foreground">({topic.count})</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Discussions */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Suggested
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {suggestedDiscussions.map((discussion, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                      {discussion.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {discussion.replies} replies
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Active Contributors */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {activeContributors.map((contributor, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-muted">
                        {contributor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">{contributor.posts} posts</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </aside>
        </div>
      </div>
    </div>
  )
}
