  else:
        content = json.loads(request.body)
        print(content)
        Appointment.objects.get(id=id).update(**content)
        appointment = Appointment.objects.filter(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )