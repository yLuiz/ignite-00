import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { EnrollmentsService } from "../../../services/enrollments.service";
import { StudentsService } from "../../../services/students.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Student } from "../models/student";


@Resolver(() => Student)
export class StudentsResolver {

  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField() // Faz o graphQL entender o relacionamento de 'student' com 'enrollment'
  course(@Parent() student: Student) {
    return this.enrollmentsService.getEnrollmentByStudentId(student.id);
  }

}