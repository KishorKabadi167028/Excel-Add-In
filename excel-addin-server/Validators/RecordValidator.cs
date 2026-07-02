using FluentValidation;
using ExcelAddinServer.Models;

namespace ExcelAddinServer.Validators;

public class RecordValidator : AbstractValidator<Record>
{
    public RecordValidator(){
        RuleFor(x=>x.Name).NotEmpty().WithMessage("Name is required").MaximumLength(200);
    }
}
