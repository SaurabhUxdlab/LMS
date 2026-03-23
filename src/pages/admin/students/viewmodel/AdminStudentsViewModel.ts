// Admin Students ViewModel - Business Logic Hooks

import { useState, useMemo, useCallback } from 'react'
import type { Student, StudentFilters, SummaryStats } from '../model/AdminStudentsModel'

// Mock data - in production this would come from an API
export const useAdminStudentsViewModel = (students: Student[]) => {
  const [filters, setFilters] = useState<StudentFilters>({
    course: 'all',
    dateRange: 'all',
    search: ''
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = !filters.search || 
        student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.email.toLowerCase().includes(filters.search.toLowerCase())
      
      const matchesCourse = filters.course === 'all' || 
        student.courses.some(c => c.name.toLowerCase().includes(filters.course.toLowerCase()))

      return matchesSearch && matchesCourse
    })
  }, [students, filters])

  // Pagination
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredStudents.slice(start, start + itemsPerPage)
  }, [filteredStudents, currentPage])

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

  // Calculate summary stats
  const summaryStats: SummaryStats = useMemo(() => {
    const activeStudents = students.filter(s => s.status === 'active').length
    const totalProgress = students.reduce((acc, s) => acc + s.overallProgress, 0)
    const avgProgress = students.length > 0 ? Math.round(totalProgress / students.length) : 0
    const certifications = students.filter(s => s.overallProgress === 100).length

    return {
      totalActiveStudents: activeStudents,
      completionRate: avgProgress,
      recentCertifications: certifications
    }
  }, [students])

  // Actions
  const updateSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }))
    setCurrentPage(1)
  }, [])

  const updateCourseFilter = useCallback((course: string) => {
    setFilters(prev => ({ ...prev, course }))
    setCurrentPage(1)
  }, [])

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  return {
    filters,
    currentPage,
    totalPages,
    filteredStudents,
    paginatedStudents,
    summaryStats,
    updateSearch,
    updateCourseFilter,
    goToPage
  }
}

export default useAdminStudentsViewModel
