from rest_framework import viewsets
from django.shortcuts import render
from .models import User,Book, BorrowRecord,Category
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .utils import send_due_notification
from django.utils import timezone
from .serializers import UserSerializer,BookSerializer,BorrowRecordSerializer, CategorySerializer
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'list']:
            permission_classes = [IsAdminUser]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]



class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    search_fields = ['title', 'author', 'ISBN']
    filterset_fields = ['status', 'category']
    ordering_fields = ['title', 'author']

class BorrowRecordViewSet(viewsets.ModelViewSet):
    queryset = BorrowRecord.objects.all()
    serializer_class = BorrowRecordSerializer
    permission_classes = [IsAuthenticated]
    
    def check_due_books(self):
        records = BorrowRecord.objects.filter(due_date__lte=timezone.now())
        for record in records:
            user_email = record.user.email
            book_title = record.book.title
            due_date = record.due_date.strftime('%Y-%m-%d')
            send_due_notification(user_email, book_title, due_date)
            count += 1
        
        return Response({'message': f'Sent {count} notifications for overdue books'})

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'list']:
            permission_classes = [IsAdminUser]
        elif self.action in ['retrieve', 'update', 'partial_update']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]