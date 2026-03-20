import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Question {
    id: string;
    question: string;
    type: "multiple-choice" | "true-false" | "short-answer";
    options?: string[];
    correctAnswer: string | number;
    feedback?: {
        correct: string;
        incorrect: string;
    };
}

export const QuizCreator = () => {
    const [selectedQuestion, setSelectedQuestion] = useState<string>("1");
    const [questions, setQuestions] = useState<Question[]>(Array.from({ length: 5 }, (_, i) => ({
        id: String(i + 1),
        question: `Question ${i + 1}`,
        type: "multiple-choice",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: 0,
        feedback: {
            correct: "",
            incorrect: "",
        },
    })));

    const [quizSettings, setQuizSettings] = useState({
        timeLimit: "",
        passingScore: "",
        randomizeQuestions: false,
    });

    const currentQuestion = questions.find((q) => q.id === selectedQuestion);

    const handleAddQuestion = () => {
        const newQuestion: Question = {
            id: String(questions.length + 1),
            question: `Question ${questions.length + 1}`,
            type: "multiple-choice",
            options: ["", "", "", ""],
            correctAnswer: 0,
            feedback: {
                correct: "",
                incorrect: "",
            },
        };
        setQuestions([...questions, newQuestion]);
    };

    const handleDeleteQuestion = (id: string) => {
        const updated = questions.filter((q) => q.id !== id);
        setQuestions(updated);
        if (selectedQuestion === id) {
            setSelectedQuestion(updated[0]?.id || "");
        }
    };

    const handleUpdateQuestion = (field: string, value: any) => {
        setQuestions(
            questions.map((q) =>
                q.id === selectedQuestion ? { ...q, [field]: value } : q
            )
        );
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950">
            <div className="max-w-[1400px] mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Quiz & Assessment Creator</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Questions Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle className="text-lg">Questions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {questions.map((question) => (
                                    <button
                                        key={question.id}
                                        onClick={() => setSelectedQuestion(question.id)}
                                        className={`w-full text-left p-2 rounded-lg text-sm font-medium transition-colors ${selectedQuestion === question.id
                                            ? "bg-blue-600 text-white"
                                            : "bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700"
                                            }`}
                                    >
                                        Question {question.id}
                                    </button>
                                ))}
                                <Button
                                    variant="outline"
                                    className="w-full mt-4 gap-2"
                                    onClick={handleAddQuestion}
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Question
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Question Editor */}
                        {currentQuestion && (
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle>Question {currentQuestion.id}</CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteQuestion(currentQuestion.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Question Text */}
                                    <div>
                                        <Label className="text-base font-semibold mb-2 block">
                                            Question
                                        </Label>
                                        <Textarea
                                            value={currentQuestion.question}
                                            onChange={(e) => handleUpdateQuestion("question", e.target.value)}
                                            placeholder="Enter your question..."
                                            className="min-h-20"
                                        />
                                    </div>

                                    {/* Question Type */}
                                    <div>
                                        <Label className="text-base font-semibold mb-2 block">
                                            Question Type
                                        </Label>
                                        <Select
                                            value={currentQuestion.type}
                                            onValueChange={(value) =>
                                                handleUpdateQuestion("type", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="multiple-choice">
                                                    Multiple Choice
                                                </SelectItem>
                                                <SelectItem value="true-false">True/False</SelectItem>
                                                <SelectItem value="short-answer">
                                                    Short Answer
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Options */}
                                    {currentQuestion.type === "multiple-choice" && (
                                        <div>
                                            <Label className="text-base font-semibold mb-2 block">
                                                Options
                                            </Label>
                                            <div className="space-y-2">
                                                {currentQuestion.options?.map((option, idx) => (
                                                    <Input
                                                        key={idx}
                                                        value={option}
                                                        onChange={(e) => {
                                                            const newOptions = [...(currentQuestion.options || [])];
                                                            newOptions[idx] = e.target.value;
                                                            handleUpdateQuestion("options", newOptions);
                                                        }}
                                                        placeholder={`Option ${idx + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Correct Answer */}
                                    <div>
                                        <Label className="text-base font-semibold mb-2 block">
                                            Correct Answer
                                        </Label>
                                        {currentQuestion.type === "multiple-choice" && (
                                            <Select
                                                value={String(currentQuestion.correctAnswer)}
                                                onValueChange={(value) =>
                                                    handleUpdateQuestion("correctAnswer", parseInt(value))
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {currentQuestion.options?.map((_, idx) => (
                                                        <SelectItem key={idx} value={String(idx)}>
                                                            Option {idx + 1}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    </div>

                                    {/* Feedback */}
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-base font-semibold mb-2 block">
                                                Feedback for correct answer
                                            </Label>
                                            <Textarea
                                                value={currentQuestion.feedback?.correct || ""}
                                                onChange={(e) =>
                                                    handleUpdateQuestion("feedback", {
                                                        ...currentQuestion.feedback,
                                                        correct: e.target.value,
                                                    })
                                                }
                                                placeholder="Provide feedback for correct answer..."
                                                className="min-h-20"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-base font-semibold mb-2 block">
                                                Feedback for incorrect answer
                                            </Label>
                                            <Textarea
                                                value={currentQuestion.feedback?.incorrect || ""}
                                                onChange={(e) =>
                                                    handleUpdateQuestion("feedback", {
                                                        ...currentQuestion.feedback,
                                                        incorrect: e.target.value,
                                                    })
                                                }
                                                placeholder="Provide feedback for incorrect answer..."
                                                className="min-h-20"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Quiz Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-base font-semibold mb-2 block">
                                            Time Limit (minutes)
                                        </Label>
                                        <Input
                                            type="number"
                                            value={quizSettings.timeLimit}
                                            onChange={(e) =>
                                                setQuizSettings({
                                                    ...quizSettings,
                                                    timeLimit: e.target.value,
                                                })
                                            }
                                            placeholder="Leave empty for no limit"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-base font-semibold mb-2 block">
                                            Passing Score (%)
                                        </Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={quizSettings.passingScore}
                                            onChange={(e) =>
                                                setQuizSettings({
                                                    ...quizSettings,
                                                    passingScore: e.target.value,
                                                })
                                            }
                                            placeholder="e.g., 70"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="randomize"
                                        checked={quizSettings.randomizeQuestions}
                                        onChange={(e) =>
                                            setQuizSettings({
                                                ...quizSettings,
                                                randomizeQuestions: e.target.checked,
                                            })
                                        }
                                        className="rounded border-gray-300"
                                    />
                                    <Label htmlFor="randomize" className="font-medium cursor-pointer">
                                        Randomize Questions
                                    </Label>
                                    <span className="text-xs text-muted-foreground ml-2">
                                        Randomize the order of questions for each student
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-end">
                            <Button variant="outline">Save Draft</Button>
                            <Button className="bg-blue-600 hover:bg-blue-700">Publish</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
