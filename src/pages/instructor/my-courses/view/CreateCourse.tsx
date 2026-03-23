import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

const CreateCourse = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  return (
    <div className="p-8 h-full flex flex-col">
      {/* FORM - All content fits without scroll */}
      <div className="flex-1 space-y-6">
        
        {/* TITLE */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Course Title</label>
          <Input 
            placeholder="Enter course title" 
            className="w-full"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Course Description</label>
          <textarea
            placeholder="Enter course description"
            className="w-full h-32 border rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <p className="text-xs text-gray-400 text-right">
            0 / 2000
          </p>
        </div>

        {/* PRICE & THUMBNAIL - SIDE BY SIDE */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* PRICE */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Course Price</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <span className="text-gray-500 mr-2">₹</span>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full outline-none bg-transparent text-sm"
              />
            </div>
          </div>

          {/* THUMBNAIL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Thumbnail</label>
            <div className="border-2 border-dashed rounded-lg p-3 text-center hover:bg-gray-50 transition cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <UploadCloud className="text-blue-600 h-6 w-6" />
                <p className="text-xs text-gray-500">PNG/JPG</p>
                <input
                  type="file"
                  className="hidden"
                  id="thumbnailUploadDrawer"
                  onChange={(e) =>
                    setThumbnail(e.target.files?.[0] || null)
                  }
                />
                <label htmlFor="thumbnailUploadDrawer">
                  <Button type="button" variant="outline" size="sm" className="text-xs">
                    Choose
                  </Button>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Input 
            placeholder="e.g., Programming, Design" 
            className="w-full"
          />
        </div>

        {/* DURATION */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Duration (hours)</label>
          <Input 
            type="number"
            placeholder="e.g., 10" 
            className="w-full"
          />
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 pt-5 border-t mt-4">
        <Button variant="outline" className="flex-1">
          Save Draft
        </Button>
        <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
          Save & Next
        </Button>
      </div>

    </div>
  );
};

export default CreateCourse;
